import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    duration: '1m',
    vus: 20,
    tags: {
    k6_cluster: 'encore_uat',
    k6_service: 'ccon'
  },
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
    },
  };

  
  const API_BASE_URL = 'https://uat.encoretech.io/core';

  export default function () {
      http.batch([
        ['GET', `${API_BASE_URL}/health-checks`],
        ['GET', `${API_BASE_URL}/health-checks/ping`]
      ]);
      
      sleep(1);
    }
