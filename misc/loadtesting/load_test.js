import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
    },
    stages:[
      { duration: '5m', target: 100 },
      { duration: '10m', target: 100 },
      { duration: '5m', target: 0 },
    ]
  };

export default function () {
    const res = http.get('https://uat.encoretech.io/core/health-checks');
    sleep(1);
  }