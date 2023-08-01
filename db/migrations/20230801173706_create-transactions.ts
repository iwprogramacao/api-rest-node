import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    // o knex.fn.now() fica responsável por dizer qual é o padrão do momento 'agora'
    //  da transação, já que são padrões diferentes em bancos diferentes. Se não
    //  fosse dessa forma, perderia o sentido de utilizar um framework para lidar
    //  com databases
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
