'use strict';
const stripe = require('stripe')('sk_test_51K7J3zEIGUZHqg4AixevKwSX1GuUiBFLh6HMriDD3oo4LSUhbvLL5EgNdKNq7CjUahbiO8yCtrQc8BQozyxulMwG005PMAfgC6');
const stripeKey = 'whsec_qlEkbNZQHBOPi62qHCeh9ayoZf31JpLk';


//***************** STRIPE WEBHOOKS SERVICESS ***********************************/
//***************** WEBHOOKS ***********************************/
exports.webhook = function (req) {
    return new Promise(function (resolve, reject) {
        try {
            const sig = req.headers['stripe-signature'];
            const event = stripe.webhooks.constructEvent(req.body, sig, stripeKey,)
            console.log(event)

        } catch (error) {
            console.log(error)
        }
        // function (err, data) {
        //     if (err) {
        //         reject(err);
        //     } else {
        //         resolve(data);
        //     }
        // });
    })
}

//***************** STRIPE CUSTOMER SERVICESS ***********************************/
//***************** CREATE CUSTOMER ***********************************/
exports.createCustomer = function (data) {
    return new Promise(function (resolve, reject) {
        stripe.customers.create(data, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

//***************** ATTACHED CARD TO USER BY TOKEN ***********************************/
exports.attachedTokenToCustomer = function (stripeId, token) {
    return new Promise(function (resolve, reject) {
        stripe.customers.update(stripeId, {
            source: token
        }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

//***************** CREATE OR GET BY EMAIL CUSTOMER ***********************************/
exports.createOrGetCustomer = function (customerId, { name, email }) {
    return new Promise(function (resolve, reject) {
        if (customerId == null || customerId == undefined || customerId == "") {
            stripe.customers.list({ email }, function (err, { data }) {
                if (err) {
                    reject(err);
                }
                else if (Object.keys(data).length > 0) {
                    resolve(data[0]);
                } else {
                    stripe.customers.create({ name, email },
                        function (err, data) {
                            if (err) {
                                reject(err);
                            } else {
                                findOneAndUpdate({ email }, { $set: { customerId: data.id } })
                                    .then((data) => {
                                        resolve(data);
                                    }).catch((err) => { reject(err) })
                            }
                        });
                }
            });
        } else {
            stripe.customers.retrieve(customerId, function (err, data) {
                if (err) {
                    console.log("1")
                    reject(err);
                } else if (data) {
                    console.log("2")
                    resolve(data);
                } else {
                    console.log("3")
                    stripe.customers.create({ name, email },
                        function (err, data) {
                            if (err) {
                                reject(err);
                            } else {
                                findOneAndUpdate({ email }, { $set: { customerId: data.id } })
                                    .then((data) => {
                                        resolve(data);
                                    }).catch((err) => { reject(err) })
                            }
                        });
                }
            });
        }
    })
}

//***************** CREATE OR GET BY EMAIL CUSTOMER ***********************************/
exports.createOrGetCustomer2 = function ({ name, email }) {
    return new Promise(function (resolve, reject) {
        stripe.customers.list({ email, limit: 1 }, function (err, { data }) {
            if (data.length > 0) {
                resolve(data[0])
            }
            else {
                stripe.customers.create({ name, email }, function (err, _data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(_data)
                    }
                });
            }
        });
    })
}

//***************** IF CREATE BY EMAIL AND GET BY CUSTOMER ***********************************/
exports.createOrGetCustomer3 = function (customer, { name, email }) {
    return new Promise(function (resolve, reject) {
        stripe.customers.retrieve(customer, function (err, data) {

            if (data) {
                resolve(data)
            } else if (err) {
                reject(err)
            }
            else {
                stripe.customers.create({ name, email }, function (err, _data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(_data)
                    }
                });
            }
        });
    })
}

//***************** IF CREATE BY EMAIL AND GET BY EMAIL ***********************************/
exports.createOrGetCustomer4 = function ({ name, email }) {
    return new Promise(function (resolve, reject) {
        stripe.customers.list({ email, limit: 1 }, function (err, { data: [userData] }) {
            if (userData) {
                resolve(userData)
            } else if (err) {
                reject(err)
            }
            else {
                stripe.customers.create({ name, email }, function (err, _data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(_data)
                    }
                });
            }
        });
    })
}

//***************** FIND BY ID CUSTOMER ***********************************/
exports.findCustomerById = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.customers.retrieve(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

//***************** FIND ALL CUSTOMER ***********************************/
exports.findCustomer = function (query) {
    return new Promise(function (resolve, reject) {
        stripe.customers.list(query, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

//***************** UPDATE CUSTOMER ***********************************/
exports.updateCustomer = function (req) {
    return new Promise(function (resolve, reject) {
        stripe.customers.update(req.params.stripeId, req.body, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

//***************** DELETE CUSTOMER ***********************************/
exports.deleteCustomer = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.customers.del(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })

    })
}

//***************** FIND CUSTOMER PAYMENT METHOD ***********************************/
exports.findCustomerPaymentMethod = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.customers.listPaymentMethods(id, { type: "card" }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}
//***************** STRIPE CUSTOMER SERVICESS ***********************************/

//====================================================================================================================================

//***************** STRIPE PRODUCTS SERVICESS ***********************************/
exports.createProduct = function (_data) {
    return new Promise(function (resolve, reject) {
        stripe.products.create(_data, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.createProductOrGet = function (_data) {
    return new Promise(function (resolve, reject) {
        stripe.products.create(_data, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.findProductsById = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.products.retrieve(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.findProducts = function (query) {
    return new Promise(function (resolve, reject) {
        stripe.products.list(query, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

exports.updateProduct = function (req) {
    return new Promise(function (resolve, reject) {
        stripe.products.update(req.params.stripeId, req.body, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

exports.deleteProduct = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.products.del(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })

    })
}
//***************** STRIPE PRODUCTS SERVICESS ***********************************/

//====================================================================================================================================

//***************** STRIPE PRICE SERVICESS ***********************************/
exports.createPrice = function (_data) {
    return new Promise(function (resolve, reject) {
        stripe.prices.create(_data, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.findPriceById = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.prices.retrieve(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.findPrices = function (query) {
    return new Promise(function (resolve, reject) {
        stripe.prices.list(query, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

exports.updatePrice = function (req) {
    return new Promise(function (resolve, reject) {
        stripe.prices.update(req.params.stripeId, req.body, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

// exports.deletePrice = function (id) {
//     return new Promise(function (resolve, reject) {
//         stripe.prices.del(id, function (err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         })

//     })
// }
//***************** STRIPE PRICE SERVICESS ***********************************/

//====================================================================================================================================

//***************** STRIPE PLAN SERVICESS ***********************************/

exports.createPlan = function (_data) {
    return new Promise(function (resolve, reject) {
        stripe.plans.create(_data, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.findPlanById = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.plans.retrieve(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.findPlans = function (query) {
    return new Promise(function (resolve, reject) {
        stripe.plans.list(query, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

exports.updatePlan = function (req) {
    return new Promise(function (resolve, reject) {
        stripe.plans.update(req.params.stripeId, req.body, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

exports.deletePlan = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.plans.del(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })

    })
}
//***************** STRIPE PLAN SERVICESS ***********************************/

//====================================================================================================================================

//***************** STRIPE SUBSCRIPTION SERVICESS ***********************************/

exports.createSubscription = function (_data) {
    return new Promise(function (resolve, reject) {
        stripe.subscriptions.create(_data, function (err, data) {
            if (err) {
                reject(err);
            } else {
                console.log(data)
                resolve(data);
            }
        });
    })
}

exports.findSubscriptionById = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.subscriptions.retrieve(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.findSubscriptions = function (query) {
    return new Promise(function (resolve, reject) {
        stripe.subscriptions.list(query, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

exports.updateSubscription = function (req) {
    return new Promise(function (resolve, reject) {
        stripe.subscriptions.update(req.params.stripeId, req.body, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

exports.deleteSubscription = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.subscriptions.del(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })

    })
}
//***************** STRIPE SUBSCRIPTION SERVICESS ***********************************/

//====================================================================================================================================

//***************** STRIPE PAYMENTMETHODS SERVICESS ***********************************/

exports.createPaymentMethod = function (_data) {
    return new Promise(function (resolve, reject) {
        stripe.paymentMethods.create(_data, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

//***************** CREATE OR GET PAYMENT METHOD BY GIVEN DATA ***********************************/
exports.createOrGetPaymentMethod = function (customerId, { card, type }) {
    return new Promise(function (resolve, reject) {
        stripe.paymentMethods.list({ customer: customerId, type: "card", limit: 1 },
            function (err, { data }) {
                if (err) {
                    reject(err);
                } else {
                    if (data.length > 0) {
                        resolve(data);
                    } else {
                        stripe.paymentMethods.create({ type, card },
                            function (err, data) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(data);
                                }
                            }
                        )
                    }
                }
            });
    })
}

exports.findPaymentMethodById = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.paymentMethods.retrieve(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.findPaymentMethods = function (query) {
    return new Promise(function (resolve, reject) {
        stripe.paymentMethods.list(query, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

exports.updatePaymentMethod = function (req) {
    return new Promise(function (resolve, reject) {
        stripe.paymentMethods.update(req.params.stripeId, req.body, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}

// exports.deletePaymentMethod = function (id) {
//     return new Promise(function (resolve, reject) {
//         stripe.paymentMethods.del(id, function (err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         })

//     })
// }

exports.attachPaymentMethod = function (req) {
    return new Promise(function (resolve, reject) {
        stripe.paymentMethods.attach(req.params.id, req.body, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.detachPaymentMethod = function (req) {
    return new Promise(function (resolve, reject) {
        stripe.paymentMethods.detach(req.params.id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}
//***************** STRIPE PAYMENTMETHODS SERVICESS ***********************************/

//====================================================================================================================================

//***************** STRIPE INVOICE SERVICESS ***********************************/

exports.getInvoice = function (id) {
    return new Promise(function (resolve, reject) {
        stripe.invoices.retrieve(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.getsInvoices = function (query) {
    return new Promise(function (resolve, reject) {
        console.log(query)
        stripe.invoices.list(query, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

//====================================================================================================================================

//***************** STRIPE CARD SERVICESS ***********************************/

exports.createCard = function (id, _data) {
    return new Promise(function (resolve, reject) {
        stripe.customers.createSource(id, { source: _data }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}