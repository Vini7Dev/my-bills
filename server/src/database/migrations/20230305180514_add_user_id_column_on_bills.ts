import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('bills', table => {
    table.integer('user_id').references('users.id').withKeyName('fk_user_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('bills', table => {
    table.dropForeign('user_id', 'fk_user_id')
  })
}
