import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('bills', table => {
    table.increments('id').primary()
    table.date('date').notNullable()
    table.string('description').notNullable()
    table.integer('value').notNullable()
    table.enum(
      'origin',
      ['bradesco', 'nubank', 'manually'],
      { useNative: true, enumName: 'bill_origins' }
    ).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('bills')
}
