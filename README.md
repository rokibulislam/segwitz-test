### segwitz Assignment 
#### Show the list of sales by daily, weekly, montly,

##### for running this api clone the repo 

for config database run
```bash
sequelize init
```

for changing db config change
```bash
    config/config.json
```

for install npm dependency
```bash
npm install
```
for running server
```bash
npm run dev
```

for seeding data to database 
```bash
sequelize db:seed:all
```
### hit below the url type=['daily','weekly',''monthly']
### http://localhost:4000/api/sales?type=daily