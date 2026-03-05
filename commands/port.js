export const command = (p) => {
  const ports = {
    20:'FTP data', 21:'FTP control', 22:'SSH', 23:'Telnet', 25:'SMTP',
    53:'DNS', 80:'HTTP', 110:'POP3', 143:'IMAP', 443:'HTTPS',
    465:'SMTPS', 587:'SMTP submission', 993:'IMAPS', 995:'POP3S',
    3000:'Node.js (dev)', 3306:'MySQL', 5000:'Flask (dev)', 5432:'PostgreSQL',
    5672:'AMQP / RabbitMQ', 6379:'Redis', 8000:'Django (dev)', 8080:'HTTP alt',
    8443:'HTTPS alt', 9200:'Elasticsearch', 27017:'MongoDB',
  }
  if (!p) return 'Usage: port <number>  e.g. port 443'
  const n = parseInt(p)
  return ports[n] ? `${n} — ${ports[n]}` : `Unknown: ${p}`
}
