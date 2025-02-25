# Integrating A DB with Granular Data Access

### 1. Start MongoDB container and interact with mongosh

Start the _MongoDB_ container:
```bash
# Start container
docker-compose up --build

# Connect to container and enter mongosh as USER WITH RESTRICTED RIGHTS
docker exec -it strictdb mongosh -u user -p user --authenticationDatabase strict_music_database

# Connect to container and enter mongosh as ADMIN WITH SUPER RIGHTS
docker exec -it strictdb mongosh -u admin -p admin --authenticationDatabase admin

# Shut down and delete volume when no longer need the container running
docker compose down -v
```

Simple _mongosh_ commands:
```bash
# To list all databases
show dbs

# To switch to a specific database
use yourDatabaseName

# To show all collections (tables) in the current database
show collections

# To list all users in the current database
db.getUsers()

# To see the current user
db.runCommand({ connectionStatus: 1 })

# Show documents for a albums collection
db.albums.find()
```


