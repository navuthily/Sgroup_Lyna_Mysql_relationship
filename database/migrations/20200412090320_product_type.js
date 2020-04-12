exports.up = (knex) => {
  return knex.schema.createTable('product_type', (table) => {
    table.increments('id').primary();
    table.string('product_type_name', 255).notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id')
      .references('id')
      .inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.string('slug', 255).notNullable().unique();
  });
};
exports.down = (knex) => {
  return knex.schema.dropTable('product_type');
};
 