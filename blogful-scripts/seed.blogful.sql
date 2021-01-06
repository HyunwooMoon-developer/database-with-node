BEGIN;

INSERT INTO blogful_articles (title, content, date_published)
VALUES
    ('first article', 'apple', now() - '21 days'::INTERVAL),
    ('second article', 'banana', now() - '21 days' :: INTERVAL),
    ('third article', 'code', now() - '15 days' :: INTERVAL),
    ('forth article', 'drama', now() - '15 days' :: INTERVAL),
    ('fifth article' , 'elephant' , now() - '15 days' :: INTERVAL),
    ('sixth article', 'fish' , now() - '15 days' :: INTERVAL),
    ('seventh article' , 'grape', now() - '15 days' :: INTERVAL),
    ('eight article', 'hello', now() - '12 days' :: INTERVAL),
    ('nineth article', 'ice cream', now() - '12 days' :: INTERVAL),
    ('tenth article' , 'jelly' , now() - '12 days' :: INTERVAL),
    ('eleventh article' , 'kangaroo', now() - '12 days' :: INTERVAL),
    ('twelveth article' , 'lama' , now() - '12 days' :: INTERVAL),
    ('thirtennth article' , 'monkey', now() - '12 days' :: INTERVAL),
    ('fourteenth article', 'name', now() - '8 days' :: INTERVAL),
    ('fifteenth article', 'operation', now() - '8 days' :: INTERVAL),
    ('sixteenth article' , 'pizza', now() - '8 days' :: INTERVAL),
    ('seventeenth article', 'quiz', now() - '8 days' :: INTERVAL),
    ('eighteenth article', 'robot', now() - '8 days' :: INTERVAL),
    ('nineteenth article', 'symbol', now()),
    ('twentyth article', 't-rex', now())
    ;

COMMIT;