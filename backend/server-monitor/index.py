import json
import requests

def handler(event: dict, context) -> dict:
    '''Получает статистику онлайна с мониторинга сервера CS'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        try:
            response = requests.get('https://monitoring-css.ru/server/46.174.50.10:27208/', timeout=5)
            
            if response.status_code == 200:
                html_content = response.text
                
                online_players = '0'
                if 'online' in html_content.lower():
                    import re
                    match = re.search(r'(\d+)\s*/\s*(\d+)', html_content)
                    if match:
                        online_players = match.group(1)
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'online': online_players,
                        'status': 'success'
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'online': '0',
                        'status': 'offline'
                    }),
                    'isBase64Encoded': False
                }
                
        except Exception as e:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'online': '0',
                    'status': 'error',
                    'message': str(e)
                }),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
