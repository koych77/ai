// Инициализация Telegram Web Apps
const tg = window.Telegram.WebApp;
tg.ready();

let userPoints = 0;
let userName = "";
let userAge = 0;

// Данные о викторинах для детей
const quizzesData = [
    { question: "Что делает компьютер?", answers: ["Читает книги", "Выполняет команды", "Спит"], correct: 1 },
    // ... другие вопросы
];

// Загрузка данных пользователя
window.onload = function() {
    userName = localStorage.getItem('userName') || "";
    userPoints = parseInt(localStorage.getItem('userPoints')) || 0;

    if (userName) {
        document.getElementById('content').innerHTML = `<h2>Добро пожаловать, ${userName}!</h2><p>Ваши очки: ${userPoints}</p>`;
    }
};

// Обработчик для регистрации пользователя
document.getElementById('registerBtn').addEventListener('click', function() {
    userName = document.getElementById('userName').value;
    userAge = parseInt(document.getElementById('userAge').value);

    if (userName && userAge >= 7 && userAge <= 18) {
        localStorage.setItem('userName', userName);
        localStorage.setItem('userPoints', userPoints);
        document.getElementById('content').innerHTML = `<h2>Добро пожаловать, ${userName}!</h2><p>Ваш возраст: ${userAge}</p>`;
    } else {
        alert("Пожалуйста, введите свое имя и возраст от 7 до 18 лет.");
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
    const buttons = document.querySelectorAll(`h3:nth-of-type(${quizIndex + 1}) ~ ul button`);
    buttons.forEach(btn => {
        btn.style.backgroundColor = "";
    });

    if (quizzesData[quizIndex].correct === answerIndex) {
        button.style.backgroundColor = "lightgreen";
        alert('Правильно!');
        userPoints += 5;
    } else {
        button.style.backgroundColor = "lightcoral";
        const correctAnswerIndex = quizzesData[quizIndex].correct;
        buttons[correctAnswerIndex].style.backgroundColor = "lightgreen";
        alert('Неправильно! Правильный ответ: ' + quizzesData[quizIndex].answers[correctAnswerIndex]);
    }

    // Проверка завершения викторины
    if (quizIndex === quizzesData.length - 1) {
        showFinalScore();
    }
}

// Отображение финального результата
function showFinalScore() {
    document.getElementById('content').innerHTML = `
        <h2>Викторина завершена!</h2>
        <p>Ваши очки: ${userPoints}</p>
        <button id="restartQuizBtn">Начать заново</button>
    `;
    document.getElementById('restartQuizBtn').addEventListener('click', function() {
        userPoints = 0; // Сбросить очки
        document.getElementById('tasks').click(); // Перезапустить викторину
    });
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
