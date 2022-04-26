export const transactions = {
  current_page: 1,
  data: [
    {
      id: 4,
      user_id: 1,
      transaction_id: 1246330451,
      item: {
        equivalent: 19.9,
        updated_at: '2022-02-19T16:58:48.000000Z',
        price: 19.9,
        discount: null,
        created_at: '2022-02-19T16:58:48.000000Z',
        id: 1,
        title: 'Mensal',
      },
      description: 'Mensal',
      transaction_amount: 19.9,
      barcode: null,
      payment_method_id: 'visa',
      payment_type_id: 'credit_card',
      external_resource_url: null,
      total_paid_amount: null,
      last_four_digits: '5682',
      status: 'rejected',
      status_detail: 'Revise o código de segurança do cartão.',
      created_at: '2022-02-22T14:07:42.000000Z',
      updated_at: '2022-02-22T14:07:42.000000Z',
      status_pt: 'Rejeitado',
    },
    {
      id: 3,
      user_id: 1,
      transaction_id: 1246313466,
      item: {
        equivalent: 19.9,
        updated_at: '2022-02-19T13:58:48.000000Z',
        price: 19.9,
        discount: null,
        created_at: '2022-02-19T13:58:48.000000Z',
        id: 1,
        title: 'Mensal',
      },
      description: 'Mensal',
      transaction_amount: 19.9,
      barcode: '23791890600000019903380260993298281000633330',
      payment_method_id: 'bolbradesco',
      payment_type_id: 'ticket',
      external_resource_url:
        'https://www.mercadopago.com/mlb/payments/sandbox/ticket/helper?payment_id=1246313466&payment_method_reference_id=9932982810&caller_id=651265037&hash=d9a005fe-f3ea-4d6a-879b-39cc453edbea',
      total_paid_amount: null,
      last_four_digits: null,
      status: 'pending',
      status_detail: 'Pendente - Aguardando pagamento',
      created_at: '2022-02-22T03:18:48.000000Z',
      updated_at: '2022-02-22T03:18:48.000000Z',
      status_pt: 'Pendente',
    },
    {
      id: 2,
      user_id: 1,
      transaction_id: 1246313449,
      item: {
        equivalent: 17.9,
        updated_at: '2022-02-19T13:58:48.000000Z',
        price: 107.4,
        discount: '-10%',
        created_at: '2022-02-19T13:58:48.000000Z',
        id: 2,
        title: 'Semestral',
      },
      description: 'Semestral',
      transaction_amount: 107.4,
      barcode: '23795890700000107403380260600302179900633330',
      payment_method_id: 'pec',
      payment_type_id: 'ticket',
      external_resource_url:
        'https://www.mercadopago.com.br/payments/1246313449/ticket?caller_id=245125138&payment_method_id=pec&payment_id=1246313449&payment_method_reference_id=6003021799&hash=176d1bf9-b5ae-429c-8179-0dab2bd4acf6',
      total_paid_amount: null,
      last_four_digits: null,
      status: 'pending',
      status_detail: 'Pendente - Aguardando pagamento',
      created_at: '2022-02-22T03:16:31.000000Z',
      updated_at: '2022-02-22T03:16:31.000000Z',
      status_pt: 'Pendente',
    },
    {
      id: 1,
      user_id: 1,
      transaction_id: 1246313439,
      item: {
        equivalent: 17.9,
        updated_at: '2022-02-19T13:58:48.000000Z',
        price: 107.4,
        discount: '-10%',
        created_at: '2022-02-19T13:58:48.000000Z',
        id: 2,
        title: 'Semestral',
      },
      description: 'Semestral',
      transaction_amount: 107.4,
      barcode: null,
      payment_method_id: 'master',
      payment_type_id: 'credit_card',
      external_resource_url: null,
      total_paid_amount: null,
      last_four_digits: '6351',
      status: 'approved',
      status_detail:
        'Pronto, seu pagamento foi aprovado! No resumo, você verá a cobrança do valor como Semestral.',
      created_at: '2022-02-22T03:13:09.000000Z',
      updated_at: '2022-02-22T03:13:09.000000Z',
      status_pt: 'Aprovado',
    },
  ],
  first_page_url: 'http://localhost/api/transactions?page=1',
  from: 1,
  last_page: 1,
  last_page_url: 'http://localhost/api/transactions?page=1',
  links: [
    {
      url: null,
      label: '&laquo; Anterior',
      active: false,
    },
    {
      url: 'http://localhost/api/transactions?page=1',
      label: '1',
      active: true,
    },
    {
      url: null,
      label: 'Próxima &raquo;',
      active: false,
    },
  ],
  next_page_url: null,
  path: 'http://localhost/api/transactions',
  per_page: '12',
  prev_page_url: null,
  to: 4,
  total: 4,
};
