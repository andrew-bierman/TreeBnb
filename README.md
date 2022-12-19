# TreeBnb

TreeBnb is a fictional treehouse rental platform inspired by Airbnb. It is built using JavaScript, Node.js, Express, React/Redux, and vanilla CSS and features a fully functional Express REST API and React front end.

## **Local Installation**

To install and run the TreeBnb app locally, follow these steps:

Clone the repository: git clone https://github.com/andrew-bierman/Airbnb-Clone-Deployment

Navigate to the project directory in the terminal

**Install dependencies:** `npm install` in both backend and frontend folders

**Run the app:**

 - Backend folder:
 
```bash
npx dotenv sequelize-cli db:migrate
npx dotenv sequelize-cli db:seed:all
npm start
```


 - Frontend folder:
```bash
npm start
```

The app will be available at http://localhost:3000/.

## Usage

To use the TreeBnb app, simply visit the URL listed above in your web browser. From there, you can browse the available treehouses and make reservations. Additionally you can visit the public deployment [here].(https://bierman-bnb.onrender.com/)

## API Reference

The TreeBnb API is built using Express and has numerous endpoints relating to Users, Spots, Reviews, Images, and Bookings.

See the full API documentation and Database Schema in the [Wiki](https://github.com/andrew-bierman/AirBnb-Clone-Deployment/wiki/Database-Schema-Design) section of this repo.

## Contribution Guidelines

We welcome contributions to the TreeBnb project! If you have an idea for a new feature or spot a bug that needs fixing, please follow these steps to submit a pull request:



 1. Fork the repository.
 2. Create a new branch for your changes.
 3. Make your changes and commit them to your branch.
 4. Push your branch to your fork on GitHub.
 5. Submit a pull request to the main repository.

Please note that all contributions must adhere to the project's code of conduct.

## License

TreeBnb is licensed under the MIT License. This means that you are free to use, modify, and distribute the code as you see fit, as long as you include the original copyright and license notice.
