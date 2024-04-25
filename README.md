
# Nutrivision

The aim of this project is to create a comprehensive image classification and advice generation system which takes the images of food product and estimate the calories in that and then give appropriate amount one should take to maintain his/her diet.

Link to the frontend: [Nutrivision-Backend](https://github.com/Anurag-Deo/Nutrivision-Backend)


## Run Locally

Clone the project

```bash
  git clone https://github.com/Anurag-Deo/Nutrivision-Frontend
```

Go to the project directory

```bash
  cd Nutrivision-Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## API Reference used in the project

#### Get all items

```http
  GET :8001/nutritional_info
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `dish` | `string` | **Required**. The dish for which we want the nutritional values to be extracted. |

#### Get item

```http
  GET :8002/info_gemini/invoke
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `'input':{'dish':dish}`      | `json` | **Required**. Internal call to fetch the data from gemini |

```http
  GET :8002/info_gpt/invoke
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `'input':{'dish':dish}`      | `json` | **Required**. Internal call to fetch the data from gpt |


```http
  GET :8002/info_claude/invoke
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `'input':{'dish':dish}`      | `json` | **Required**. Internal call to fetch the data from claude |

```http
  GET :8003/detect
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file`      | `file` | **Required**. Image of the food item for the classification |


## Screenshots

![Architecture](./screenshots/1.png)
![Architecture](./screenshots/2.png)


## Demo 

https://github.com/Anurag-Deo/Nutrivision-Frontend/assets/92918449/7912528d-5283-4326-b0dd-bc01f7423ca0

