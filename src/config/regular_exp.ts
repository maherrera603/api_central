export const regular_exp = {
    phone: /\d{10}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*_?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,12}$/,
}