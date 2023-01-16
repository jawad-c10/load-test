import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    duration: '10s',
    vus: 1,
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
    },
    stages:[
      { duration: '1m', target:10 },
      { duration: '2m', target: 100 },
      { duration: '3m', target: 200 },
      { duration: '5m', target: 0 },
    ]
  };

const API_BASE_URL = 'https://uat.encoretech.io/core';

export default function () {
    http.batch([
      ['GET', `${API_BASE_URL}/health-checks`],
      ['GET', `${API_BASE_URL}/ping`]
    ]);
    
    sleep(1);
  }