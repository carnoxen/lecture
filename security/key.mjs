import crypto from "crypto";

var PRIVKEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAuErwCGWyq3nIASTKhgiHGAaURZ9rs5EBR9L1YUJh1ftYgQSt
0gUzab6hyW/upgM4Z4Mu6pA+KZCHncKc4SHJXdJvYnj1L6/RRinXQp+R3MmGypoB
/r1ckM1aEt75/I0m7Dlatj58f56Z21yHsJNbtf1LAD981a3kR6kaIb7Uc5bsUDwO
bF2r5xAenQDtaZoWgaErHWwiqzJJQebcAVVqlq2/+f1kzRVqHsasosXOD6hrDz9o
C2SvBKWVrmOPF4D+mwwaChEKAhFDvCKj5NYwprmoOXWK6t5WroYvsVo5Sa039DiC
PXMsug9MidhQLB7SpW7Bi+xeuwvObWppgGZ8FQIDAQABAoIBAQCPOcYkcI0UETgs
E2DGHBiJxoszNLuqOVaKcFw9sy5/87ALzQwdvecAFqR7/d617KjIYb5zk5iMCwQq
ylXL7csmfGYOXL0Iy5ZT9i6SW5srwP9ds6U7SgWHj+Ch6+LSsQx/5+8k1ZlCQYuH
XPkjdNKAtJK2ZaDqHBPe0YA6m6lXDrEOJl6xrlUWCZS02XPIXFaB+qTBG2UqWCUK
KzVa9qIqWf3bVGJCLc70u5UiuvCC+V8VtJ964AEnj90qZy1tRhEc2X8bbWmhL3yB
3SLWH4ZvJyEDQe/yycx9rO6CymDj3c378IyWORYt1y6mKRmltr2NJ1Ecbl9xaFrc
JeVO8wDdAoGBAOUjZzuaVppccEIiBbLS0NksSeD4tfjlUPFqVU1obZcbkDugK1Id
og+W5yVy2NqgeEi4nQ9Ogi485cWbCzTZM52d9zuFe/60hBFPU8jWxafW0OW2o6ci
F1vtzWEF2EO7omUoiGu6mOI4yRcUMwXiw1cCWr2NYpASQ39QuxwXKgg7AoGBAM3l
sC7nxqDusq+J9CI6V+oNb2v7KgapQmrdXNB5l6Mk2Dl/uNfuX5cDceMQlO5B/ObT
44kgsBR3tO6y7PQLDClt5ZPrVJZ16+cCj41UDDgZDD0vDaU24K/qSVrsOH4gNgeM
CcsInzX/l1bm+RAhE0pHuPHBZFuLi8brV/wZCpfvAoGAQu4XbmKDn20W4UpczcIk
fPshzVP4m24oOYwsxIKXWEcV10TOwpqjRth2RgsI6rtqxxsdzWXKQsVI/HJwUIyN
NiH5IGq6MEj8Nq4sNAMAEyl9NUwm+1/K4PBSSF/Trt0070Vqq8UCeTnLCzG8QaDe
HCE07h9JRfn/u0WSkf72KRcCgYAUTGmjJix53y50idgsq63RIEP01E0fXP50RKCK
2QHvDonWmVXiy9hWrftDVHYqSw0gwJD1CujxC6AlzDP6F0C6sN/qRlAPiU6ZdrIq
T7foq+d9/K6OtCtQjHtw4ErtfEV3VwH8Jzxy+WC1K44wXeJl904vX06Ci+5azQbe
jqVxtwKBgBnxVKFQCmuDjOZrf7V0jB/mf4ir9npqvHdJMHE/Et70lOaUbhat6i+Y
PPtJewynfF4zp+HD6jOlj4RhbCncMNdaWAyDYOucYOJOpMr5mIYJHdCOVQ0aSRD7
/dZEOGblrch6VXOEvC++yaToNhjkeTP63IH4K6uqa9btelz3Df5Y
-----END RSA PRIVATE KEY-----`;

var PUBKEY = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAuErwCGWyq3nIASTKhgiHGAaURZ9rs5EBR9L1YUJh1ftYgQSt0gUz
ab6hyW/upgM4Z4Mu6pA+KZCHncKc4SHJXdJvYnj1L6/RRinXQp+R3MmGypoB/r1c
kM1aEt75/I0m7Dlatj58f56Z21yHsJNbtf1LAD981a3kR6kaIb7Uc5bsUDwObF2r
5xAenQDtaZoWgaErHWwiqzJJQebcAVVqlq2/+f1kzRVqHsasosXOD6hrDz9oC2Sv
BKWVrmOPF4D+mwwaChEKAhFDvCKj5NYwprmoOXWK6t5WroYvsVo5Sa039DiCPXMs
ug9MidhQLB7SpW7Bi+xeuwvObWppgGZ8FQIDAQAB
-----END RSA PUBLIC KEY-----`;

// RSA PRIVATE ENCRYPT -> PUBLIC DECRYPT //
var my_message = "[ORIGINAL] I'm securekim !!!";

function privENC_pubDEC(origin_message) {
    let encrypted_message = crypto.privateEncrypt(PRIVKEY, Buffer.from(origin_message, 'utf8')).toString('base64');
    console.log(`Encrypted with private key: ${encrypted_message}`);

    let decrypted_message = crypto.publicDecrypt(PUBKEY, Buffer.from(encrypted_message, 'base64'));
    console.log(decrypted_message.toString());
}

function pubENC_privDEC(origin_message) {
    let encrypted_message = crypto.publicEncrypt(PUBKEY, Buffer.from(origin_message, 'utf8')).toString('base64');
    console.log(`[OAEP] Encrypted with public key: ${encrypted_message}`);

    let decrypted_message = crypto.privateDecrypt(PRIVKEY, Buffer.from(encrypted_message, 'base64'));
    console.log(decrypted_message.toString());
}

privENC_pubDEC(my_message); // RSA-OAEP 적용 안됨
console.log();
pubENC_privDEC(my_message); // RSA-OAEP 적용 됨