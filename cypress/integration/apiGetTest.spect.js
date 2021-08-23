/// <reference types="cypress" />

/* 
describe - Given -> Test Suite name
context - When -> Test Inner Suite name
it - Then -> You should place your tests here!
*/



describe('Given the Users api', () => {
    context('When I send GET /usuarios', () => {
      it('Then it should return a list with all registered users', () => {
        // place your tests here
      });
    });
  
    context('When I send GET /usuarios passing id query param', () => {
      it('Then it should return only the filtered user', () => {
        // place your tests here 

        cy.request({ 
            method: 'GET', 
            url: 'https://serverest.dev/usuarios'
        })
        .should((response) => {
            // all your assertions should be placed here!!
            /* Validar que responda el codigo numero 200 */
            expect(response.status).to.eq(200)

            /* Validar cuantos registros existen */
            expect(response.body.quantidade).to.eq(response.body.usuarios.length)
            
            /* Validar que cierto campo no sea null */
            expect(response.body.usuarios[0].email).to.not.be.null
            expect(response.body.usuarios[1].email).to.not.be.null
            expect(response.body.usuarios[33].email).to.not.be.null
            
            /* Validar que ningun campo email sea nulo */
            Cypress._.each(response.body.usuarios, (usuario) => {
                expect(usuario.email).to.not.be.null
                /* Validar que este compuesto con ciertos campos */
            expect(usuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id')
            })

            cy.log(JSON.stringify(response.body))
          });

       });
    });

    context('When I send GET /usuarios passing id query param', () => {
        it('Then it should return only the filtered user', () => {
          cy.request({
            method: 'GET',
            url: 'https://serverest.dev/usuarios',
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


            

