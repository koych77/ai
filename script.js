let userPoints = 0;
let userName = "";
let userAge = 0;

// Данные о викторинах для детей
const quizzesData = [
    { question: "Что делает компьютер?", answers: ["Читает книги", "Выполняет команды", "Спит"], correct: 1 },
    { question: "Что такое робот?", answers: ["Игрушка", "Машина, которая может думать и двигаться", "Рыба"], correct: 1 },
    { question: "Как называется программа, которая учится?", answers: ["Компьютер", "Телевизор", "Искусственный интеллект"], correct: 2 },
    { question: "Что помогает машине видеть?", answers: ["Глаза", "Камера", "Уши"], correct: 1 },
    { question: "Что делает программа, когда она учится?", answers: ["Запоминает примеры", "Пишет книги", "Ест конфеты"], correct: 0 },
    { question: "Какая машина умеет считать?", answers: ["Калькулятор", "Автомобиль", "Телефон"], correct: 0 },
    { question: "Кто может танцевать брейк-данс?", answers: ["Человек", "Робот", "Оба варианта"], correct: 2 },
    { question: "Что такое интернет?", answers: ["Большая библиотека", "Игра", "Робот"], correct: 0 },
    { question: "Как зовут помощника, который отвечает на вопросы в телефоне?", answers: ["Алексей", "Сири", "Иван"], correct: 1 },
    { question: "Что делает нейронная сеть?", answers: ["Играет музыку", "Имитирует мозг", "Летает"], correct: 1 },
    { question: "Что такое приложение?", answers: ["Игра", "Программа на телефоне", "Песня"], correct: 1 },
    { question: "Как робот узнает, куда идти?", answers: ["С помощью карты", "С помощью датчиков", "С помощью часов"], correct: 1 },
    { question: "Что помогает роботу слышать?", answers: ["Уши", "Микрофон", "Колонки"], correct: 1 },
    { question: "Какие данные может собирать камера?", answers: ["Звуки", "Изображения", "Запахи"], correct: 1 },
    { question: "Что такое код?", answers: ["Язык для компьютеров", "Мелодия", "Книга"], correct: 0 },
    { question: "Что делают роботы в фильмах?", answers: ["Прыгают", "Помогают", "Рисуют"], correct: 1 },
    { question: "Что важно для обучения компьютера?", answers: ["Примеры", "Цвета", "Фигуры"], correct: 0 },
    { question: "Как называется процесс создания игр?", answers: ["Программирование", "Рисование", "Чтение"], correct: 0 },
    { question: "Что такое виртуальная реальность?", answers: ["Игра", "Мир, созданный компьютером", "Книга"], correct: 1 },
    { question: "Как зовут персонажа, который танцует?", answers: ["Робби", "Мария", "Глеб"], correct: 0 },
    { question: "Что делает алгоритм?", answers: ["Решает задачи", "Рисует картинки", "Ест"], correct: 0 },
    { question: "Что может делать искусственный интеллект?", answers: ["Играть в игры", "Общаться с людьми", "Все вышеперечисленное"], correct: 2 },
    { question: "Как называется умная колонка?", answers: ["Музыкальная колонка", "Смарт-колонка", "Телевизор"], correct: 1 },
    { question: "Что может делать смартфон?", answers: ["Разговаривать", "Играет музыку", "Оба варианта"], correct: 2 },
    { question: "Кто учит компьютер играть в шахматы?", answers: ["Программисты", "Музыканты", "Художники"], correct: 0 },
    { question: "Что нужно, чтобы создать приложение?", answers: ["Программа", "Еда", "Робот"], correct: 0 },
    { question: "Что можно сделать с помощью 3D-принтера?", answers: ["Напечатать игрушку", "Играть", "Готовить еду"], correct: 0 },
    { question: "Что делает голосовой помощник?", answers: ["Играет в игры", "Помогает отвечать на вопросы", "Поет песни"], correct: 1 },
    { question: "Как называется умный робот?", answers: ["Искусственный интеллект", "Телефон", "Компьютер"], correct: 0 },
    { question: "Что нужно роботу, чтобы двигаться?", answers: ["Электричество", "Еда", "Книга"], correct: 0 }
];

// Обработчик для регистрации пользователя
document.getElementById('registerBtn').addEventListener('click', function() {
    userName = document.getElementById('userName').value;
    userAge = document.getElementById('userAge').value;

    if (userName && userAge) {
        document.getElementById('content').innerHTML = `<h2>Добро пожаловать, ${userName}!</h2><p>Ваш возраст: ${userAge}</p>`;
    } else {
        alert("Пожалуйста, введите свое имя и возраст.");
    }
});

// Обработчик для главной страницы
document.getElementById('home').addEventListener('click', function() {
    document.getElementById('content').innerHTML = '<h2>Добро пожаловать в AI Coda Kids!</h2><p>Здесь вы можете узнать о заданиях.</p>';
});

// Обработчик для раздела заданий
document.getElementById('tasks').addEventListener('click', function() {
    let tasksHtml = '<h2>Викторина</h2>';
    quizzesData.forEach((quiz, index) => {
        tasksHtml += `<h3>Вопрос ${index + 1}: ${quiz.question}</h3><ul>`;
        quiz.answers.forEach((answer, i) => {
            tasksHtml += `<li><button onclick="checkAnswer(${index}, ${i}, this)">${answer}</button></li>`;
        });
        tasksHtml += '</ul>';
    });
    document.getElementById('content').innerHTML = tasksHtml;
});

// Проверка ответа на вопрос викторины
function checkAnswer(quizIndex, answerIndex, button) {
    // Находим все кнопки текущего вопроса
    const buttons = document.querySelectorAll(`h3:nth-of-type(${quizIndex + 1}) ~ ul button`);

    // Убираем подсветку со всех кнопок
    buttons.forEach(btn => {
        btn.style.backgroundColor = "";
    });

    if (quizzesData[quizIndex].correct === answerIndex) {
        button.style.backgroundColor = "lightgreen"; // Подсветка правильного ответа
        alert('Правильно!');
        userPoints += 5; // Начисляем 5 баллов за правильный ответ
    } else {
        button.style.backgroundColor = "lightcoral"; // Подсветка неправильного ответа
        const correctAnswerIndex = quizzesData[quizIndex].correct;
        buttons[correctAnswerIndex].style.backgroundColor = "lightgreen"; // Подсветка правильного ответа
        alert('Неправильно! Правильный ответ: ' + quizzesData[quizIndex].answers[correctAnswerIndex]);
    }
}

// Добавление пункта с личным кабинетом
document.getElementById('profile').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <h2>Личный кабинет</h2>
        <p>Имя: ${userName}</p>
        <p>Возраст: ${userAge}</p>
        <p>Очки: ${userPoints}</p>
        <button id="backBtn">Назад</button>
    `;
    document.getElementById('backBtn').addEventListener('click', function() {
        document.getElementById('content').innerHTML = '<h2>Добро пожаловать в AI Coda Kids!</h2><p>Здесь вы можете узнать о заданиях.</p>';
    });
});


