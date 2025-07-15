# Stage 1: Build React App
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build


# Stage 2: Serve App using a lightweight image
FROM node:20-alpine

WORKDIR /app

# Install `serve` to serve the built React files
RUN npm install -g serve

# Copy build output from previous stage
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
