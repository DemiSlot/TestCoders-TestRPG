describe('API Test - GET Builds', () => {
    it('GET - fetch and validate all builds', () => {
        cy.request({
            method: 'GET',
            url: '/api/builds',
        }).then((response) => {
            expect(response.status).to.eq(200);
            const builds = response.body;
            expect(builds).to.have.all.keys('thief', 'knight', 'mage', 'brigadier');
            expect(builds.thief).to.include({
                weapon: 'knife',
                upgradedWeapon: 'katana',
                armor: 'leather_armor',
                upgradedArmor: 'silver_armor',
                strength: 1,
                agility: 6,
                wisdom: 2,
                magic: 1
            });
            expect(builds.knight).to.include({
                weapon: 'knife',
                upgradedWeapon: 'longsword',
                armor: 'partial_plate',
                upgradedArmor: 'full_plate',
                strength: 6,
                agility: 2,
                wisdom: 1,
                magic: 1
            });
            expect(builds.mage).to.include({
                weapon: 'staff',
                upgradedWeapon: 'staff',
                armor: 'cloak',
                upgradedArmor: 'silver_armor',
                strength: 0,
                agility: 1,
                wisdom: 3,
                magic: 6
            });
            expect(builds.brigadier).to.include({
                weapon: 'bronze_mace',
                upgradedWeapon: 'hammer',
                armor: 'brigadier_armor',
                upgradedArmor: 'silver_armor',
                strength: 3,
                agility: 1,
                wisdom: 6,
                magic: 1
            });
        });
    });
    it('POST /api/builds - fails with existing name', () => {
        cy.request({
            method: 'POST',
            url: '/api/builds',
            failOnStatusCode: false,
            body: {
                build: {
                    name: 'mage',
                    strength: 3,
                    agility: 2,
                    wisdom: 2,
                    magic: 3
                }
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            expect(response.status).to.eq(400); // Verwacht een 400 Bad Request error
            expect(response.body).to.have.property('error'); // Controleer of er een foutmelding is
        });
    });

    it('POST /api/builds - fails with invalid skill values', () => {
        cy.request({
            method: 'POST',
            url: '/api/builds',
            failOnStatusCode: false,
            body: {
                build: {
                    name: 'necromancer',
                    strength: 11,
                    agility: 0,
                    wisdom: 0,
                    magic: 0
                }
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error');
        });
    });
    // de volgende test faalt doordat hij null teruggeeft, maar ik heb nu geen tijd meer om uit te zoeken hoe ik het moet oplossen. Ik kijk uit naar de feedback!
    it('POST - create new build', () => {
        cy.request({
            method: 'POST',
            url: '/api/builds',
            body: {
                build: {
                    name: 'necromancer',
                    strength: 1,
                    agility: 2,
                    wisdom: 3,
                    magic: 4
                }
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.build).to.have.property('name', 'necromancer');
        });
    });
});