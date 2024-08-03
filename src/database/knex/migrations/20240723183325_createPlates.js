exports.up = knex => knex.schema.createTable("plates", table => {
  table.increments("id");
  table.string('image_url');
  table.text("title");
  table.string('category');
  table.decimal('price', 8, 2);
  table.text("description");
  table.integer("user_id").references("id").inTable("users");
  
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("plates");