import express from "express";
import { sequelize } from "./lib/index.js";
import { ticket } from "./models/ticket.model.js";
import { customer } from "./models/customer.model.js";
import { agent } from "./models/agent.model.js";
import { ticketCustomer } from "./models/ticketCustomer.model.js";
import { ticketAgent } from "./models/ticketAgent.model.js";

const app = express();
app.use(express.json());

app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  let tickets = await ticket.bulkCreate([
    {
      ticketId: 1,
      title: "Login Issue",
      description: "Cannot login to account",
      status: "open",
      priority: 1,
      customerId: 1,
      agentId: 1,
    },
    {
      ticketId: 2,
      title: "Payment Failure",
      description: "Payment not processed",
      status: "closed",
      priority: 2,
      customerId: 2,
      agentId: 2,
    },
    {
      ticketId: 3,
      title: "Bug Report",
      description: "Found a bug in the system",
      status: "open",
      priority: 3,
      customerId: 1,
      agentId: 1,
    },
  ]);

  let customers = await customer.bulkCreate([
    { customerId: 1, name: "Alice", email: "alice@example.com" },
    { customerId: 2, name: "Bob", email: "bob@example.com" },
  ]);

  let agents = await agent.bulkCreate([
    { agentId: 1, name: "Charlie", email: "charlie@example.com" },
    { agentId: 2, name: "Dave", email: "dave@example.com" },
  ]);

  await ticketCustomer.bulkCreate([
    { ticketId: tickets[0].id, customerId: customers[0].id },
    { ticketId: tickets[2].id, customerId: customers[0].id },
    { ticketId: tickets[1].id, customerId: customers[1].id },
  ]);

  await ticketAgent.bulkCreate([
    { ticketId: tickets[0].id, agentId: agents[0].id },
    { ticketId: tickets[2].id, agentId: agents[0].id },
    { ticketId: tickets[1].id, agentId: agents[1].id },
  ]);

  return res.json({ message: "Database seeded successfully" });
});

// Helper function to get ticket's associated customers
async function getTicketCustomers(ticketId) {
  const ticketCustomers = await ticketCustomer.findAll({
    where: { ticketId },
  });

  let customerData = [];
  for (let i = 0; i < ticketCustomers.length; i++) {
    customerData = await customer.findOne({
      where: { id: ticketCustomers[i].customerId },
    });
  }

  return customerData;
}

// Helper function to get ticket's associated agents

async function getTicketAgents(ticketId) {
  const ticketAgents = await ticketAgent.findAll({
    where: { ticketId },
  });

  let agentData = [];
  for (let i = 0; i < ticketAgents.length; i++) {
    agentData = await agent.findOne({
      where: { id: ticketAgents[i].agentId },
    });
  }

  return agentData;
}

// Helper function to get ticket details with associated customers and agents
// async function getTicketDetails(ticketData) {
//   const customer = await getTicketCustomers(ticketData.id);
//   const agent = await getTicketAgents(ticketData.id);

//   return {
//     ...ticketData.dataValues,
//     customer,
//     agent,
//   };
// }

async function getTicketDetails(ticketData) {
  const customerData = await customer.findOne({
    where: { id: ticketData.customerId },
    attributes: ["id", "name", "email", "createdAt", "updatedAt"],
  });
  const agentData = await agent.findOne({
    where: { id: ticketData.agentId },
    attributes: ["id", "name", "email", "createdAt", "updatedAt"],
  });
  return {
    id: ticketData.id,
    title: ticketData.title,
    description: ticketData.description,
    status: ticketData.status,
    priority: ticketData.priority,
    createdAt: ticketData.createdAt,
    updatedAt: ticketData.updatedAt,
    customer: customerData,
    agent: agentData,
  };
}

// 1: Get All Tickets.

async function fetchAllTickets() {
  let tickets = await ticket.findAll();

  let detailedTickets = [];
  for (let i = 0; i < tickets.length; i++) {
    let detailedTicket = await getTicketDetails(tickets[i]);
    detailedTickets.push(detailedTicket);
  }
  return { detailedTickets };
}

app.get("/tickets", async (req, res) => {
  try {
    let response = await fetchAllTickets();
    if (response.detailedTickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2: Get Ticket by ID.

async function getTicketById(id) {
  let ticketData = await ticket.findOne({ where: { ticketId: id } });
  if (!ticketData) {
    return {};
  }
  let detailedTicket = await getTicketDetails(ticketData);
  return { detailedTicket };
}

app.get("/tickets/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await getTicketById(id);
    if (!response.detailedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3: Get Tickets by Status.

async function getTicketByStatus(status) {
  let tickets = await ticket.findAll({ where: { status } });
  if (!tickets) {
    return {};
  }

  let detailedTickets = [];
  for (let i = 0; i < tickets.length; i++) {
    let detailedTicket = await getTicketDetails(tickets[i]);
    detailedTickets.push(detailedTicket);
  }
  return { detailedTickets };
}

app.get("/tickets/status/:status", async (req, res) => {
  try {
    let status = req.params.status;
    let response = await getTicketByStatus(status);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  4: Get Tickets Sorted by Priority.

async function sortTicketsByPriority(order) {
  let sortedTickets = await ticket.findAll({ order: [["priority", order]] });
  if (!sortedTickets) {
    return {};
  }
  let detailedTickets = [];
  for (let i = 0; i < sortedTickets.length; i++) {
    let detailedTicket = await getTicketDetails(sortedTickets[i]);
    detailedTickets.push(detailedTicket);
  }
  return { detailedTickets };
}

app.get("/tickets/sort-by-priority", async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortTicketsByPriority(order);

    if (result.detailedTickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5: Add a New Ticket.

async function addNewTicket(data) {
  const newTicket = await ticket.create({
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    customerId: data.customerId,
    agentId: data.agentId,
  });
  const ticketDetails = await getTicketDetails(newTicket);
  return { ticket: ticketDetails };
}
app.post("/tickets/new", async (req, res) => {
  try {
    const ticketData = req.body;
    const result = await addNewTicket(ticketData);

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6: Update Ticket Details.

async function updateTicketDetails(ticketId, updatedData) {
  let ticketData = await ticket.findOne({ where: { id: ticketId } });
  if (!ticketData) {
    return { message: "Ticket not found" };
  }

  if (updatedData.title) ticketData.title = updatedData.title;
  if (updatedData.description) ticketData.description = updatedData.description;
  if (updatedData.status) ticketData.status = updatedData.status;
  if (updatedData.priority) ticketData.priority = updatedData.priority;
  await ticketData.save();

  if (updatedData.customerId) {
    await ticketCustomer.destroy({ where: { ticketId } });
    await ticketCustomer.create({
      ticketId: ticketId,
      customerId: updatedData.customerId,
    });
  }

  if (updatedData.agentId) {
    await ticketAgent.destroy({ where: { ticketId } });
    await ticketAgent.create({
      ticketId: ticketId,
      agentId: updatedData.agentId,
    });
  }

  return ticketData;
}

app.post("/tickets/update/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const updatedData = req.body;
    const updatedTicket = await updateTicketDetails(ticketId, updatedData);
    if (updatedTicket.message) {
      return res.status(404).json({ message: updatedTicket.message });
    }
    const result = await getTicketDetails(updatedTicket);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7: Delete a Ticket.

async function deleteTicket(ticketId) {
  await ticketCustomer.destroy({ where: { ticketId } });
  await ticketAgent.destroy({ where: { ticketId } });
  const deletedCount = await ticket.destroy({ where: { id: ticketId } });
  if (!deletedCount === 0) {
    return {};
  }
  return { message: "Ticket with ID " + ticketId + " deleted successfully." };
}

app.post("/tickets/delete", async (req, res) => {
  try {
    const ticketId = req.body.id;
    const result = await deleteTicket(ticketId);
    if (!result.message) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
