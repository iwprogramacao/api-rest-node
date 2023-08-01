import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    // o .after('id') diz que será posicionada coluna depois
    //  do campo especificado no parâmetro
    // o .index() diz que será um campo amplamente utilizado em transações
    //  (buscas) específicas no campo do parâmetro criando uma espécie de cache
    table.uuid('session_id').after('id').index()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id')
  })
}
