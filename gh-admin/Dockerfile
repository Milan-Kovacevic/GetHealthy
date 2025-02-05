FROM refinedev/node:18

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

ENV NODE_ENV production

RUN npm i -g serve

COPY . .

RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
CMD [ "serve", "-s", "dist" ]
