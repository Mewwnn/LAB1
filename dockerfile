FROM nginx:1.29.5
COPY src /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]