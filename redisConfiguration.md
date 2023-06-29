docker build -f dockerRedis -t quicklink-redis .
docker run -p 6379:6379 --name quicklink-redis-local quicklink-redis
