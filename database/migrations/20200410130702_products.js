exports.up = (knex) => {
  return knex.schema.createTable('products', (table) => {
 
    table.increments('id').primary();
    table.string('product_name', 255).notNullable();
    table.string('describe', 255).notNullable();
    table.integer('price').notNullable();
    table.integer('product_type_id').unsigned();
    table.foreign('product_type_id').references('id').inTable('product_type').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('path_img', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
 
  });
};
 
exports.down = (knex) => {
  return knex.schema.dropTable('products');
};
