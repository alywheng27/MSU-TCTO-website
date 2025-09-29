// Test script to verify environment variables are loading correctly
// Run this with: node test-env.js

import { loadEnv } from 'vite';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

// Load environment variables using Vite
const env = loadEnv('development', process.cwd(), '');

console.log('=== ENVIRONMENT VARIABLES TEST ===');
console.log('From dotenv:');
console.log('GMAIL_USER:', process.env.GMAIL_USER ? 'Set' : 'Not set');
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set');

console.log('\nFrom Vite loadEnv:');
console.log('GMAIL_USER:', env.GMAIL_USER ? 'Set' : 'Not set');
console.log('GMAIL_APP_PASSWORD:', env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set');

console.log('\nAll environment variables:');
console.log(Object.keys(process.env).filter(key => key.includes('GMAIL')));

console.log('\nVite env variables:');
console.log(Object.keys(env).filter(key => key.includes('GMAIL')));

console.log('=====================================');
