const sql = require('mssql')
const config = require('../config/connectSQLServer');

const human = {};

/*
    Transaction like
        BEGIN;
            INSERT INTO pets (name, species) VALUES ('Fido', 'dog'), ('Albert', 'cat');
            INSERT INTO food (name, quantity) VALUES ('Dog Biscuit', 3), ('Cat Food', 5);
        END;
    if some thing wrong in add process, above query will be rollback, util both of them success or overtime
*/
human.getBenefitPlans = async () => {
    try {
        const pool = await sql.connect(config);
        const sqlScript = `SELECT  [Benefit_Plan_ID], [Plan_Name], [Deductable], [Percentage_CoPay]  FROM [dbo].[Benefit_Plans];`
        const result = await pool.request().query(sqlScript);
        return result.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

human.getMaxIDBenefitPlan = async () => {
    try {
        const pool = await sql.connect(config);
        const sqlScript = `SELECT MAX(Benefit_Plan_ID) AS MaxID FROM [dbo].[Benefit_Plans]`
        const result = await pool.request().query(sqlScript);
        return result.recordset[0];
    }
    catch (error) {
        console.log(error, "catch max id");
    }
}

human.deleteBenefitPlan = async (id) => {
    try {
        const pool = await sql.connect(config);
        const transaction = new sql.Transaction(pool)
        await transaction.begin()
            .then((err) => {
                if (err) console.log(err);
                const sqlScript = `DELETE FROM [dbo].[Benefit_Plans] WHERE Benefit_Plan_ID = ${parseInt(id)}`;
                const request = new sql.Request(transaction);
                return request.query(sqlScript);
            })
            .then((err) => {
                if (err) console.log(err);
                transaction.commit(err => {
                    if (err) console.log(err)
                })
            })
            .then(err => {
                if (err) console.log(err);
            })
    }
    catch (error) {
        console.log(error);
    }
}

human.addBenefitPlan = async (benefitPlan) => {
    try {
        const { planName, deductable, percentageCoPay } = benefitPlan;
        const pool = await sql.connect(config);

        const transaction = new sql.Transaction(pool);
        await transaction.begin()
            .then((err) => {
                if (err) console.log(err, "err begin");
                const sqlScript = `INSERT INTO [dbo].[Benefit_Plans] (Plan_Name, Deductable, Percentage_CoPay) VALUES ('${planName}', ${parseInt(deductable)}, ${parseInt(percentageCoPay)})`;
                const request = new sql.Request(transaction);
                return request.query(sqlScript);
            })
            .then((err) => {
                if (err) console.log(err, "err query");
                transaction.commit(err => {
                    if (err) console.log(err, "err commit");
                })
            })
            .then(err => {
                if (err) console.log(err, "err last");
            })
    }
    catch (error) {
        console.log(error, "err catch");
    }
}

human.updateBenefitPlan = async (benefitPlan) => {
    try {
        const { benefitPlanID, planName, deductable, percentageCoPay } = benefitPlan;
        const pool = await sql.connect(config);
        const transaction = new sql.Transaction(pool)
        await transaction.begin()
            .then((err) => {
                if (err) console.log(err);
                const sqlScript = `UPDATE [dbo].[Benefit_Plans] SET Plan_Name = '${planName}', Deductable = ${parseInt(deductable)}, Percentage_CoPay = ${parseInt(percentageCoPay)} WHERE Benefit_Plan_ID = ${parseInt(benefitPlanID)}`;
                const request = new sql.Request(transaction);
                return request.query(sqlScript);
            })
            .then((err) => {
                if (err) console.log(err);
                transaction.commit(err => {
                    if (err) console.log(err)
                })
            })
            .then(err => {
                if (err) console.log(err);
            })
    }
    catch (error) {
        console.log(error);
    }
}

human.getPersonal = async () => {
    try {
        const pool = await sql.connect(config);
        const sqlScript = `SELECT * FROM [dbo].[Personal];`
        const result = await pool.request().query(sqlScript);
        return result.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

human.getJobHistory = async () => {
    try {
        const pool = await sql.connect(config);
        const sqlScript = `SELECT ID, First_Name, Last_Name, Department, Division, Start_Date, End_Date, Job_Category, Location  FROM [dbo].[Job_History], [dbo].[Personal] WHERE [dbo].[Job_History].Employee_ID = [dbo].[Personal].Employee_ID;`
        const result = await pool.request().query(sqlScript);
        return result.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

human.getMaxIDJobHistory = async () => {
    try {
        const pool = await sql.connect(config);
        const sqlScript = `SELECT MAX(ID) AS MaxID FROM [dbo].[Job_History]`
        const result = await pool.request().query(sqlScript);
        return result.recordset[0];
    }
    catch (error) {
        console.log(error);
    }
}

human.getDepartment = async () => {
    try {
        const pool = await sql.connect(config);
        const sqlScript = `SELECT Department  FROM Job_History`
        const result = await pool.request().query(sqlScript);
        return new Set(result.recordset.map(department => department['Department']));
    }
    catch (error) {
        console.log(error);
    }
}

human.getEmployeeID = async (department) => {
    try {
        const pool = await sql.connect(config);
        const sqlScript = `SELECT Employee_ID  FROM Job_History WHERE Department = '${department}'`
        const result = await pool.request().query(sqlScript);
        return result.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

human.addPersonal = async (employee) => {
    try {
        const { idEmployee, firstName, lastName, middleInitial, address1, address2, city, state, zip, email, phoneNumber, socialSecurityNumber, driversLicense, maritalStatus, gender, shareholderStatus, benefitPlans, ethnicity } = employee;
        const pool = await sql.connect(config);

        const transaction = new sql.Transaction(pool)
        await transaction.begin()
            .then((err) => {
                if (err) console.log(err);
                const sqlScript = `INSERT INTO [dbo].[Personal] (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity) VALUES (${parseInt(idEmployee)}, N'${firstName}', N'${lastName}', '${middleInitial}', N'${address1}', N'${address2}', N'${city}', N'${state}', ${parseInt(zip)}, '${email}', '${phoneNumber}', '${socialSecurityNumber}', '${driversLicense}', '${maritalStatus}', '${gender}', '${(shareholderStatus ? shareholderStatus : 'False')}', ${parseInt(benefitPlans)}, '${ethnicity}')`
                const request = new sql.Request(transaction);
                return request.query(sqlScript);
            })
            .then((err) => {
                if (err) console.log(err);
                transaction.commit(err => {
                    if (err) console.log(err)
                })
            })
            .then(err => {
                if (err) console.log(err);
            })
    }
    catch (error) {
        console.log(error);
    }
}

human.updatePersonal = async (employee) => {
    try {
        const { idEmployee, firstName, lastName, middleInitial, address1, address2, city, state, zip, email, phoneNumber, socialSecurityNumber, driversLicense, maritalStatus, gender, shareholderStatus, benefitPlans, ethnicity } = employee;
        const pool = await sql.connect(config);

        const transaction = new sql.Transaction(pool)
        await transaction.begin()
            .then((err) => {
                if (err) console.log(err);
                const sqlScript = `UPDATE [dbo].[Personal] SET First_Name = '${firstName}', Last_Name = '${lastName}', Middle_Initial = '${middleInitial}', Address1 = '${address1}', Address2 = '${address2}', City = '${city}', State = '${state}', Zip = ${parseInt(zip)}, Email = '${email}', Phone_Number = '${phoneNumber}', Social_Security_Number = '${socialSecurityNumber}', Drivers_License = '${driversLicense}', Marital_Status = '${maritalStatus}', Gender = '${gender}', Shareholder_Status = '${(shareholderStatus ? shareholderStatus : 'False')}', Benefit_Plans = ${parseInt(benefitPlans)}, Ethnicity = '${ethnicity}' WHERE Employee_ID = ${parseInt(idEmployee)}`;
                const request = new sql.Request(transaction);
                return request.query(sqlScript);
            })
            .then((err) => {
                if (err) console.log(err);
                transaction.commit(err => {
                    if (err) console.log(err)
                })
            })
            .then(err => {
                if (err) console.log(err);
            })
    }
    catch (error) {
        console.log(error);
    }
}

human.deletePersonal = async (idEmployee) => {
    try {
        const pool = await sql.connect(config);

        const transaction = new sql.Transaction(pool)
        await transaction.begin()
            .then((err) => {
                if (err) console.log(err);
                const sqlScript = `DELETE FROM [dbo].[Personal] WHERE Employee_ID = ${parseInt(idEmployee)}`;
                const request = new sql.Request(transaction);
                return request.query(sqlScript);
            })
            .then((err) => {
                if (err) console.log(err);
                transaction.commit(err => {
                    if (err) console.log(err)
                })
            })
            .then(err => {
                if (err) console.log(err);
            })
    }
    catch (error) {
        console.log(error);
    }
}

human.updateJobHistory = async (jobHistory) => {
    try {
        const { id, employeeId, department, division, startDate, endDate, jobTitle, supervisor, jobCategory, location, departmentCode, salaryType, payPeriod, hoursPerWeek, hazardousTraining } = jobHistory;
        const pool = await sql.connect(config);

        const transaction = new sql.Transaction(pool)
        await transaction.begin()
            .then(() => {
                const sqlScript = `UPDATE [dbo].[Job_History] SET Employee_ID = ${parseInt(employeeId)}, Department = '${department}', Division = '${division}', Start_Date = '${startDate}', End_Date = '${endDate}', Job_Title = '${jobTitle}', Supervisor = '${parseInt(supervisor)}', Job_Category = '${jobCategory}', Location = '${location}', Departmen_Code = ${parseInt(departmentCode)}, Salary_Type = ${parseInt(salaryType)}, Pay_Period = '${payPeriod}', Hours_per_Week = ${parseInt(hoursPerWeek)}, Hazardous_Training = '${(hazardousTraining ? 'True' : 'False')}' WHERE ID = ${parseInt(id)}`;
                const request = new sql.Request(transaction);
                return request.query(sqlScript);
            })
            .then((err) => {
                if (err) console.log(err);
                return transaction.commit()
            })
            .then(err => {
                if (err) console.log(err);
            })
    }
    catch (error) {
        console.log(error);
    }
}

human.addJobHistory = async (jobHistory) => {
    try {
        const { employeeId, department, division, startDate, endDate, jobTitle, supervisor, jobCategory, location, departmentCode, salaryType, payPeriod, hoursPerWeek, hazardousTraining } = jobHistory;
        const pool = await sql.connect(config);

        const transaction = new sql.Transaction(pool)
        await transaction.begin()
            .then(() => {
                const sqlScript = `INSERT INTO [dbo].[Job_History] (Employee_ID, Department, Division, Start_Date, End_Date, Job_Title, Supervisor, Job_Category, Location, Departmen_Code, Salary_Type, Pay_Period, Hours_per_Week, Hazardous_Training) VALUES (${parseInt(employeeId)}, '${department}', '${division}', '${startDate}', '${endDate}', '${jobTitle}', '${parseInt(supervisor)}', '${jobCategory}', '${location}', ${parseInt(departmentCode)}, ${parseInt(salaryType)}, '${payPeriod}', ${parseInt(hoursPerWeek)}, '${(hazardousTraining ? 'True' : 'False')}')`;
                const request = new sql.Request(transaction);
                return request.query(sqlScript);
            })
            .then((err) => {
                if (err) console.log(err);
                console.log('add finish')
                return transaction.commit();
            })
            .then(err => {
                if (err) console.log(err);
            })
    }
    catch (error) {
        console.log(error);
    }
}

human.deleteJobHistory = async (id) => {
    try {
        const pool = await sql.connect(config);

        const transaction = new sql.Transaction(pool)
        await transaction.begin()
            .then(() => {
                const sqlScript = `DELETE FROM [dbo].[Job_History] WHERE ID = ${parseInt(id)}`;
                const request = new sql.Request(transaction);
                return request.query(sqlScript);
            })
            .then(() => {
                return transaction.commit();
            })
            .then(err => {
                if (err) console.log(err);
            })
    }
    catch (error) {
        console.log(error);
    }
}
// (async() => {
//     const result = await human.getEmployeeID('IT');
//     console.log(result);
// })()

module.exports = human;