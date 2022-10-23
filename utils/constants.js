module.exports.regular = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;

// ошибки

// 404
module.exports.NFUser = 'Пользователь не найден';
module.exports.NFCard = 'Фильм не найден';
module.exports.NF = 'Страница не найдена';

// 400
module.exports.BR = 'Некорректные данные';

// 409
module.exports.Conf = 'Пользователь с таким email уже существует';

// 403
module.exports.Forb = 'Недостаточно прав для удаления карточки';

// 401
module.exports.UnautAuth = 'Вы не авторизированны';

// 500
module.exports.SerserErr = 'Ошибка сервера';

// успешно
module.exports.LoginTrue = 'Вы зарагестированны';
module.exports.LoginFalse = 'Вы покинули аккаунт';
module.exports.FilmDelete = 'Фильм удален';
