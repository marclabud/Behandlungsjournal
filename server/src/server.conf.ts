'use strict';
// ToDo: Use classes

// base-path for testserver
// http://127.0.0.1:5000/api
// für start aus nodeserver mit server.js reicht /api aus

export const paths: any = {
  dist_client: 'public',
  base_path: 'http://127.0.0.1:5000/api'
};
export const connection: any = {
  dbsystem: 'mongodb://',
  dburl: 'localhost:27017',
  dbname: 'test'
};
