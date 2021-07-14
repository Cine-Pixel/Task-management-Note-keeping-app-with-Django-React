# Task Management/Note Keeping app

App built with [Django Rest Framework](https://www.django-rest-framework.org/) and React-Typescript with [React-bootstrap](https://react-bootstrap.github.io/) components

## Run locally
1. Clone the repo
    ```sh
    git clone https://github.com/Cine-Pixel/Task-management-Note-keeping-app-with-Django-React.git
    ```

2. Create virtual environment and install dependencies
    ```sh
    pip install -r requirements.txt
    ```

3. Navigate to frontend directory and install javascript packages
    ```sh
    cd frontend
    yarn
    ```

4. Build the react project or start development server on [localhost:3000](http://localhost:3000)
    ```sh
    yarn build
    # or
    yarn start
    ```

5. Navigete back to root directory, apply migrations and run django server on [localhost:8000](http://localhost:8000) 
    ```sh
    cd ..
    python manage.py migrate
    python manage.py runserver
    ```