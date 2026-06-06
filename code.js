// Indian Restaurant Billing System

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) =>
    new Promise((resolve) => rl.question(query, resolve));

// Menu
const menu = {
    Monday: [
        { id: 1, name: "Aloo Paratha", price: 50 },
        { id: 2, name: "Chole Bhature", price: 80 },
        { id: 3, name: "Rajma Chawal", price: 100 }
    ],

    Tuesday: [
        { id: 4, name: "Poha", price: 40 },
        { id: 5, name: "Paneer Butter Masala", price: 150 },
        { id: 6, name: "Naan", price: 30 }
    ],

    Wednesday: [
        { id: 7, name: "Idli Sambar", price: 60 },
        { id: 8, name: "Masala Dosa", price: 90 },
        { id: 9, name: "Medu Vada", price: 50 }
    ],

    Thursday: [
        { id: 10, name: "Kadhi Chawal", price: 90 },
        { id: 11, name: "Veg Biryani", price: 140 },
        { id: 12, name: "Boondi Raita", price: 40 }
    ],

    Friday: [
        { id: 13, name: "Pav Bhaji", price: 90 },
        { id: 14, name: "Misal Pav", price: 80 },
        { id: 15, name: "Masala Chai", price: 20 }
    ],

    Saturday: [
        { id: 16, name: "Butter Chicken", price: 220 },
        { id: 17, name: "Tandoori Roti", price: 20 },
        { id: 18, name: "Jeera Rice", price: 90 }
    ],

    Sunday: [
        { id: 19, name: "Puri Sabzi", price: 70 },
        { id: 20, name: "Dal Makhani", price: 130 },
        { id: 21, name: "Gulab Jamun", price: 50 }
    ]
};

async function runProgram() {

    console.log("========================================");
    console.log("      WELCOME TO INDIAN FOOD HOUSE");
    console.log("========================================");

    // Customer Details
    const customerName =
        await askQuestion("\nEnter Customer Name: ");

    const mobileNumber =
        await askQuestion("Enter Mobile Number: ");

    const billNumber =
        Math.floor(1000 + Math.random() * 9000);

    const now = new Date();

    const date =
        now.toLocaleDateString();

    const time =
        now.toLocaleTimeString();

    console.log("\nAvailable Days:");

    for (const day in menu) {
        console.log(day);
    }

    const selectedDay =
        await askQuestion(
            "\nEnter Day Name: "
        );

    const day =
        selectedDay.charAt(0).toUpperCase() +
        selectedDay.slice(1).toLowerCase();

    if (!menu[day]) {

        console.log("Invalid Day!");

        rl.close();
        return;
    }

    console.log(`\n========== ${day} MENU ==========`);

    menu[day].forEach(item => {

        console.log(
            `[${item.id}] ${item.name} - ₹${item.price}`
        );
    });

    let totalBill = 0;

    const selectedItems = [];

    // Ordering Loop
    while (true) {

        const answer =
            await askQuestion(
                '\nEnter Food ID (or type "done"): '
            );

        if (
            answer.toLowerCase().trim() ===
            "done"
        ) {
            break;
        }

        const foodId =
            parseInt(answer);

        const food =
            menu[day].find(
                item => item.id === foodId
            );

        if (!food) {

            console.log(
                "Invalid Food ID!"
            );

            continue;
        }

        const quantityInput =
            await askQuestion(
                "Enter Quantity: "
            );

        const quantity =
            parseInt(quantityInput);

        if (
            isNaN(quantity) ||
            quantity <= 0
        ) {

            console.log(
                "Invalid Quantity!"
            );

            continue;
        }

        const itemTotal =
            food.price * quantity;

        selectedItems.push({
            name: food.name,
            price: food.price,
            quantity: quantity,
            total: itemTotal
        });

        totalBill += itemTotal;

        console.log(
            `${food.name} x${quantity} Added`
        );

        console.log(
            `Current Total = ₹${totalBill}`
        );
    }

    if (
        selectedItems.length === 0
    ) {

        console.log(
            "\nNo Items Ordered!"
        );

        rl.close();
        return;
    }

    // Coupon
    const coupon =
        await askQuestion(
            "\nEnter Coupon (SAVE10 / SAVE20 / NO): "
        );

    let discount = 0;

    if (
        coupon.toUpperCase() ===
        "SAVE10"
    ) {

        discount =
            totalBill * 0.10;

    } else if (
        coupon.toUpperCase() ===
        "SAVE20"
    ) {

        discount =
            totalBill * 0.20;
    }

    // Final Bill
    const finalBill =
        totalBill - discount;

    // Invoice
    console.log("\n");
    console.log("========================================");
    console.log("          INDIAN FOOD HOUSE");
    console.log("========================================");

    console.log(
        `Bill Number : ${billNumber}`
    );

    console.log(
        `Customer    : ${customerName}`
    );

    console.log(
        `Mobile      : ${mobileNumber}`
    );

    console.log(
        `Date        : ${date}`
    );

    console.log(
        `Time        : ${time}`
    );

    console.log("----------------------------------------");

    console.log("ORDER DETAILS");

    console.log("----------------------------------------");

    selectedItems.forEach(item => {

        console.log(
            `${item.name}`
        );

        console.log(
            `Qty : ${item.quantity}`
        );

        console.log(
            `Price : ₹${item.price}`
        );

        console.log(
            `Total : ₹${item.total}`
        );

        console.log("----------------------------------------");
    });

    console.log(
        `Sub Total : ₹${totalBill}`
    );

    console.log(
        `Discount  : ₹${discount}`
    );

    console.log(
        `Final Bill: ₹${finalBill}`
    );

    console.log("----------------------------------------");

    // Payment Mode
    console.log(
        "\nPayment Modes"
    );

    console.log("1. Cash");
    console.log("2. UPI");
    console.log("3. Debit Card");
    console.log("4. Credit Card");

    const paymentChoice =
        await askQuestion(
            "\nSelect Payment Mode: "
        );

    let paymentMode;

    switch (paymentChoice) {

        case "1":
            paymentMode = "Cash";
            break;

        case "2":
            paymentMode = "UPI";
            break;

        case "3":
            paymentMode = "Debit Card";
            break;

        case "4":
            paymentMode = "Credit Card";
            break;

        default:
            paymentMode = "Cash";
    }

    let remainingAmount =
        finalBill;

    while (
        remainingAmount > 0
    ) {

        const paymentInput =
            await askQuestion(
                `\nEnter Payment Amount (Remaining ₹${remainingAmount}): `
            );

        const payment =
            parseFloat(paymentInput);

        if (
            isNaN(payment) ||
            payment <= 0
        ) {

            console.log(
                "Invalid Amount!"
            );

            continue;
        }

        if (
            payment >= remainingAmount
        ) {

            const change =
                payment -
                remainingAmount;

            console.log(
                "\nPayment Accepted!"
            );

            console.log(
                `Payment Mode : ${paymentMode}`
            );

            if (change > 0) {

                console.log(
                    `Return Amount : ₹${change.toFixed(2)}`
                );
            }

            remainingAmount = 0;

        } else {

            remainingAmount -= payment;

            console.log(
                `Received ₹${payment}`
            );

            console.log(
                `Remaining ₹${remainingAmount.toFixed(2)}`
            );
        }
    }

    console.log("\n========================================");
    console.log("       THANK YOU! VISIT AGAIN");
    console.log("========================================");

    rl.close();
}

runProgram();