const $regFrom = document.forms.reg;
const $logFrom = document.forms.log;
const $accLink = document.querySelector('[data-link]');
const $account = document.querySelector('[data-link=account]');
const $datawr = document.querySelector('[data-wr]');
const $nav = document.querySelector('nav');
const $navDiv = document.querySelector('[data-user]');

$navDiv?.addEventListener('click', async (e) => {
  if(e.target.dataset.link === 'account') {
  e.preventDefault();
  const id = e.target.closest('div').dataset.user;
  const response = await fetch(`/user/map/point`);
  const data = await response.json();
    if(data.length) {
      const html = data.reduce((a, e) => a + getCard(e),'');
      $datawr.innerHTML = html;
    } else {
      $datawr.innerHTML = 'Вы не добавляли книг';
    }
  } else if(e.target.dataset.link === 'addbook') {
    e.preventDefault();
    const id = e.target.closest('div').dataset.user;
    $datawr.innerHTML = getForm();
  } else if(e.target.dataset.link === 'reg' ) {
    e.preventDefault();
    $datawr.innerHTML = getRegForm();
  } else if (e.target.dataset.link === "log") {
    e.preventDefault();
    $datawr.innerHTML = getLogForm();
  }
});

$datawr?.addEventListener('submit', async (e) => {
  if(e.target.dataset.form === 'new') {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const response = await fetch('/user/book', {method:'POST', credentials:'include',
  headers:{
  'Content-Type':'application/json'}, body:JSON.stringify(data)})
  const addedBook = await response.json();
  if(response.status === 200) $account.click();
  else console.log(addedBook);
  } else if (e.target.dataset.form === 'update') {
    e.preventDefault();
    const id = e.target.dataset.id;
    const data = Object.fromEntries(new FormData(e.target));
    const response = await fetch(`/user/book/${id}`, {method:'PATCH', credentials:'include',
    headers:{
    'Content-Type':'application/json'}, body:JSON.stringify(data)})
    const updatedBook = await response.json();
    if(updatedBook.status === 204) {
        $datawr.innerHTML = 'Книга успешно изменена, вы будете перенаправлены на список ваших книг';
        setTimeout(()=> {
          $account.click();
        }, 2000)
    }
    else console.log(updatedBook);
  } else if(e.target.dataset.form === "newlocation") {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const response = await fetch(`/user/map/`, {method:'POST', credentials:'include',
    headers:{
    'Content-Type':'application/json'}, body:JSON.stringify(data)})
    const newlocation = await response.json();
    if(response.status === 200) {
      alert('Добавлено успешно');
      location.reload();
    }
  }
});
$datawr?.addEventListener('click', async (e) => {
  if(e.target.dataset.modify === 'delete') {
    e.preventDefault();
    const id = e.target.closest('div').dataset.id;
    const response = await fetch(`/user/map/${id}`, {method:'DELETE', credentials:'include'});
    if(response.status === 204) {
      $datawr.innerHTML = 'Локация успешно удалена, вы будете перенаправлены на список ваших книг';
      setTimeout(()=> {
        $account.click();
      }, 2000)
    }
    else console.log(await response.json());
  } else if(e.target.dataset.modify === 'update') {
    e.preventDefault();
    const id = e.target.closest('div').dataset.id;
    const response = await fetch(`/user/book/${id}`);
    const data = await response.json();
    $datawr.innerHTML = getForm(data);
  } else if (e.target.dataset.like) {
    const id = e.target.dataset.like;
    const response = await fetch(`/user/like/${id}`, {method:"PUT", credentials:'include'});
    if(response.status === 200) console.log('лайк')
    else if (response.status === 403) console.log('вы уже лайкали эту книгу')
    else console.log('ой ой ой как же так');
  } 
});

function getCard(obj) {
  return `<div class="card" style="width: 18rem;">
  <div data-id="${obj.id}" class="card-body">
    <h5 class="card-title">${obj.description}</h5>
    <p class="card-text">Координаты X:${obj.x}, Y:${obj.y}</p>
    <a data-modify="delete" href="/user/map/${obj.id}" class="btn btn-primary">Удалить книгу</a>
  </div>
</div>`
//<a data-modify="update" href="/user/book/${obj.id}" class="btn btn-primary">Редактировать книгу</a>
}
function getForm(obj) {
  if(obj) {
    return `<form data-id="${obj.id}" data-form="update" class="form-inline" action="/user/book" method="POST">
    <input type='text' name="name" placeholder="Название" value="${obj.name}">
    </label>
    <label>
      <input type='text' name="description" placeholder="Описание" value="${obj.description}">
    </label>
    <button type="submit">Изменить книгу книгу</button>
    </form>`
  } else {
    return `<form data-form="new" class="form-inline" action="/user/book" method="POST">
    <input type='text' name="name" placeholder="Название">
    </label>
    <label>
      <input type='text' name="description" placeholder="Описание">
    </label>
    <button type="submit">Добавить книгу</button>
    </form>`
  }
}
function getRegForm() {
  return `<div class="container mb-3">
    <form name="reg" class="form" action="/registration" method="POST">
        <label>
          <input class="form-control" type='text' name="name" placeholder="Name">
        </label>
        <label>
          <input class="form-control" type='email' name="email" placeholder="email">
        </label>
        <label>
          <input class="form-control" type='password' name="password" placeholder="Password">
        </label>
        <label>
          <input class="form-control" type='date' name="graduation_date">
        </label>
        <button class="btn btn-dark" type="submit">SignIn</button>
  </form></div>`
}
function getLogForm() {
  return `<div class="container mb-3">
    <form name="log" class="form" action="/authorization" method="POST">
        <label>
          <input class="form-control" type='email' name="email" placeholder="email">
        </label>
        <label>
          <input class="form-control" type='password' name="password" placeholder="Password">
        </label>
        <button class="btn btn-dark" type="submit">SignIn</button>
  </form></div>`
}
