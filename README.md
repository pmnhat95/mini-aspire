# Mini aspire

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
$(npm bin)/cypress open
```

### Lints and fixes files
```
npm run lint
```

## Troubleshooting

### Toast problem

elite theme has some toast css with is conflicted with our vuex-toast module, to update the new css from the theme. we should eliminate all the `.toast` css in the file.
