# Kanban Board

A feature-rich and interactive Kanban Board application to help users manage their tasks effectively. Built with modern web development technologies to ensure performance, responsiveness, and ease of use.

## Features

- **Create, Read, Update, Delete (CRUD):** Add, edit, move, and delete tasks across columns.
- **Drag-and-Drop:** Intuitive task management with drag-and-drop functionality.
- **Customizable Columns:** Add or remove columns to fit your workflow.
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices.
- **Persistent Storage:** Save tasks and their states in the browser's local storage or backend database.

## Demo
https://kanban-board-wqjk.vercel.app/

## Technologies Used

- **Frontend:** React, props Drilling concept, Tailwind CSS,Dnd-Kit library
=

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RoshanJungRayamajhi/Kanban-board.git
   cd Kanban-board
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Add new columns to organize your tasks.
2. Add tasks under each column.
3. Drag and drop tasks to reorder or move them between columns.
4. Double-click on a task to edit it.
5. Delete tasks or columns as needed.
6. make a persistence by putting the data in local storage

## Project Structure

```plaintext
Kanban-board/
├── public/
├── src/
│   ├── components/       # React components
│   ├── pages/            # Page-level components
│   ├── redux/            # Redux store and slices
│   ├── styles/           # CSS and Tailwind configurations
│   └── utils/            # Helper functions
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── package.json          # Project dependencies
└── README.md             # Documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Created by [Roshan Jung Rayamajhi](https://github.com/RoshanJungRayamajhi). Feel free to reach out for collaboration or feedback!
