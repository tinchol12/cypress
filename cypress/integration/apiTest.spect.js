describe('Products api', () => {
    context('GET /produtos', () => {
        it('should return a list with all products', () => {
            cy.request({
                method: 'GET',
                url: 'https://serverest.dev/produtos'
            })
                .should((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.quantidade).to.eq(91)
                    expect(response.body.produtos.length).to.be.eq(91);
                    expect(response.body.produtos[0]).to.have.all.keys(
                      'nome', 'preco', 'descricao', 'quantidade', '_id'
                    )
                });
        });
    });
});

/*****************************************************************************/
/* POST */


let fakeUser;

describe('Given the Users api', () => {
  beforeEach(() => {
    cy.task('freshUser').then((user) => {
      fakeUser = user;
      cy.log(JSON.stringify(fakeUser))
    });
  });

  context('When I send POST /usuarios', () => {
    it('Then it should create a new user', () => {
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: fakeUser
      })
        .should((response) => {
          expect(response.status).eq(201)
          expect(response.body.message).eq("Cadastro realizado com sucesso")
        });
    });
  });
});

/***************************************************************************/
/* GET */

describe('Given the Users api', () => {
    context('When I send GET /usuarios', () => {
      it('Then it should return a list with all registered users', () => {
        cy.request({
          method: 'GET',
          url: '/usuarios'
        })
          .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.quantidade).to.eq(response.body.usuarios.length)
            Cypress._.each(response.body.usuarios, (usuario) => {
              expect(usuario.email).to.not.be.null
              expect(usuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id')
            })
          });
      });
    });
  
    context('When I send GET /usuarios passing id query param', () => {
      it('Then it should return only the filtered user', () => {
        cy.request({
          method: 'GET',
          url: '/usuarios',
          qs: {
            _id: '0uxuPY0cbmQhpEz1'
          }
        })
          .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.usuarios[0].nome).to.eq("Fulano da Silva")
          });
      });
    });
  });