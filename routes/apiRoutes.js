const express = require("express");
const Joi = require('joi');
const cors = require('cors')
const router = express.Router();
const db = require("../models");
const moment = require('moment');
var app = express()

app.use(cors())

const { fn,col, literal } = require("sequelize");

router.get('/sales', async (req, res) => {
    if( req.query.type == 'monthly') {
        let today = moment();
        today.subtract(30, 'd');

        let sales = await db.sales.findAll({
            attributes: [
                [fn('year', col('date')), 'year'],
                [fn('month', col('date')), 'month'],
                [ fn('date_format',col('date'), "%Y-%m-%d"),'date'],
                [fn('sum', col('amount')), 'amount'],
            ],
            group: [ 
                fn('year',col('date')),
                fn('month',col('date')),
                'date'
            ],
            order: [
                literal('year DESC'),
                literal('month DESC')
            ]
        });

        sales = sales.filter( sale =>  {
            return moment( sale.date ) > today
        })

        return res.send(sales);
    } else if( req.query.type == 'weekly') {
        let today = moment();
        today.subtract(7, 'd');

        let sales = await db.sales.findAll({
            attributes: [
                [fn('SUM', col('amount')), 'amount'],
                [fn('COUNT', col('id')), 'order_count'],
                [ fn('date_format',col('date'), "%Y-%m-%d"),'date'],  
                [ fn('DAYNAME',col('date')),'weekday']  
            ],
            group: [ 
                fn('date_format',col('date'), '%Y-%m-%d'),
                fn('DAYNAME',col('date'))
            ],
        });
        
        sales = sales.filter( sale =>  {
            console.log(sale);
            return moment( sale.date ) > today
        })

        return res.send(sales);
    } else if ( req.query.type == 'daily') {
        let today = moment();
        // today.subtract(3, 'd');
        let sales = await db.sales.findAll({
            attributes: [
                [fn('SUM', col('amount')), 'order_amount'],
                [fn('COUNT', col('id')), 'order_count'],
                [ fn('date_format',col('date'), "%Y-%m-%d"),'date'],      
                // [ fn('hour',col('date')), 'hour']        
                [ fn( 'date_format', col('date'), '%h %p'), 'hour']        
            ],
            group: [ 
                fn('date_format',col('date'),'%h %p'),
                // fn('hour',col('date')),
                fn('date_format',col('date'), '%Y-%m-%d')
            ],
            order: [
                literal('date DESC'),
                literal('hour DESC'),
            ]
        });
        
        sales = sales.filter( sale=> {
            console.log(sale.date);
           return today.isSame(sale.date,'day')
        });

        return res.send(sales);
    }

});

router.post('/sales', async ( req,res) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        date: Joi.date().required(), 
        amount: Joi.number().required()
    });

    const { error } = await schema.validateAsync(req.body);

    if( error ) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        let username =  req.body.username
        let date     =  req.body.date
        let amount   =  req.body.amount

        let response = await db.sales.create({
            username: username,
            date: new Date(req.body.date).toLocaleString(),
            amount: amount
        });

        res.send(response)
    } catch(error) {
        res.send(error);
    }
});

module.exports = router;