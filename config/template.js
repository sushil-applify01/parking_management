module.exports = ({
  orgName,
  date,
  name,
  slipID,
  phone,
  vehicleModel,
  vehicleNumber,
  slotDate,
  fees,
}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  
  <body>
      <div style="text-align: center;">
          <div
              style=" display: flex; flex-direction: column; justify-content: space-evenly; align-items: flex-start; width:300px">
              <h1>${orgName}</h1>
              <p><strong>Token:</strong> ${slipID}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Number:</strong> ${phone}</p>
              <p><strong>Vehicle:</strong> ${vehicleModel}</p>
              <p><strong>Vehicle Number:</strong> ${vehicleNumber}</p>
              <p><strong>Slot Date:</strong> ${slotDate}</p>
  
  
              <hr width="300px">
              <div
                  style="display: flex; flex-direction: row; justify-content: space-evenly;justify-items: space-evenly; align-items: space-evenly;align-content: space-around;">
                  <p style="font-weight: bold;">Total:</p>
  
                  <p>${fees}</p>
              </div>
              <hr width="300px">
          </div>
      </div>
  </body>
  
  </html>
    `;
};
