# Info
Valid Customer IDs: 1,2,3

# Download and run from DockerHub (recommended)
0. Requirements
- Docker Desktop v4.2.0+

1. Clone the repository
```
git clone https://github.com/ecurrah/palitronica-codingchallenge.git
```

2. Docker Compose Set-up
```
cd {project_root}
docker-compose pull
docker-compose up
```

3. Navigate to http://localhost:3000 

4. Docker Compose Tear-down
```
cd {project_root}
docker-compose down
```

# Clone and Run Locally

0. Requirements
- Node.js v14.9.0
- Docker Desktop v4.2.0+
- Requires mongodb to be running on localhost at port 27017

1. Clone the repository
```
git clone https://github.com/ecurrah/palitronica-codingchallenge.git
```

2. Start Client
```
cd {project_root}/client
npm install
npm start
```

3. Start API
```
cd {project_root}/api
npm install
npm start
```
Note: 
Update /api/.env to connect to local mongodb instance (reference "localhost" as the host rather than "mongodb" container name)

# Run MongoDB as Standalone
```
docker-compose -f ./docker-compose-dbonly.yml up
```