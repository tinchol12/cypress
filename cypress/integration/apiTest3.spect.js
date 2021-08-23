describe('HTTP Example', () => {

    it('GET', () => {
        cy.request({
            method: 'GET',
            url: 'http://httpbin.org/get'
        }).then(function(response) {
            expect(response.body).to.have.property('url')
        })
    })

    it('POST', () => {
        cy.request({
            method: 'POST',
            url: 'http://httpbin.org/post',
            body: {
                "name": "Martin",
                "age" : 35 
            },
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response) {
            expect(response.body).to.have.property('json')
            expect(response.body.json).to.deep.equal({
                    "name": "Martin",
                    "age" : 35               
            })
        })
    })

    it('PUT', () => {
        cy.request('PUT','http://httpbin.org/put', {"name": "Martin"}).then((response) => {
            expect(response.body).to.have.property('json')
            expect(response.body.json).to.deep.equal({"name": "Martin"})
        })
    })


})