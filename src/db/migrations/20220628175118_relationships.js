const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Tags", deps: []
 * createTable() => "Users", deps: []
 * createTable() => "Categories", deps: [Users, Users]
 * createTable() => "Pets", deps: [Categories]
 * createTable() => "Images", deps: [Pets]
 * createTable() => "Orders", deps: [Pets]
 * createTable() => "Pet_Tag", deps: [Pets, Tags]
 *
 */

const info = {
  revision: 1,
  name: "relationships",
  created: "2022-06-28T17:51:18.729Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Tags",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          required: true,
          unique: false,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          field: "username",
          required: true,
          unique: true,
          allowNull: false,
        },
        firstname: {
          type: Sequelize.STRING,
          field: "firstname",
          required: true,
          unique: false,
          allowNull: false,
        },
        lastname: {
          type: Sequelize.STRING,
          field: "lastname",
          required: true,
          unique: false,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          field: "email",
          required: false,
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          required: true,
          unique: false,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
          field: "phone",
          required: false,
          unique: true,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Categories",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Users", key: "id" },
          name: "userId",
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "id" },
          name: "categoryId",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Pets",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          required: true,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM("available", "pending", "sold"),
          field: "status",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Categories", key: "id" },
          name: "categoryId",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Images",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        filename: { type: Sequelize.STRING, field: "filename" },
        data: { type: Sequelize.BLOB("long"), field: "data" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        petId: {
          type: Sequelize.INTEGER,
          field: "petId",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Pets", key: "id" },
          name: "petId",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Orders",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        quantity: { type: Sequelize.INTEGER, field: "quantity" },
        shipDate: { type: Sequelize.DATE, field: "shipDate" },
        status: {
          type: Sequelize.ENUM("placed", "approved", "delivered"),
          field: "status",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        petId: {
          type: Sequelize.INTEGER,
          field: "petId",
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Pets", key: "id" },
          name: "petId",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Pet_Tag",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        petId: {
          type: Sequelize.INTEGER,
          field: "petId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Pets", key: "id" },
          primaryKey: true,
        },
        tagId: {
          type: Sequelize.INTEGER,
          field: "tagId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Tags", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Images", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Orders", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Pets", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Tags", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Pet_Tag", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
