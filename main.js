// main.js
// Wersja z obsługą oddzielnych zdjęć dla j. ang (group1 / group2) oraz WF (boys / girls),
// plus poprzednie funkcje: toggle'y, modal, live clock itp.

(() => {
  const periods = [
    {id:1, start:'08:10', end:'08:55'},
    {id:2, start:'09:05', end:'09:50'},
    {id:3, start:'10:00', end:'10:45'},
    {id:4, start:'11:05', end:'11:50'},
    {id:5, start:'12:00', end:'12:45'},
    {id:6, start:'12:55', end:'13:40'},
    {id:7, start:'13:50', end:'14:35'},
    {id:8, start:'14:40', end:'15:25'},
    {id:9, start:'15:30', end:'16:15'},
    {id:10,start:'16:20', end:'17:05'}
  ];

  const days = [
    {code:'pn', name:'Poniedziałek'},
    {code:'wt', name:'Wtorek'},
    {code:'sr', name:'Środa'},
    {code:'cz', name:'Czwartek'},
    {code:'pt', name:'Piątek'}
  ];

  // Schedule exactly as provided by user:
  const schedule = {
    pn: {
      1: [],
      2: [],
      3: [{subject:'j. hisz', group:'all', info:'język hiszpański', room:'10', teacher:'Joanna Karkut'},{subject:'j. niem', group:'all', info:'język niemiecki', room:'10', teacher:'Joanna Gardynik'}],
      4: [{subject:'mat', group:'all', info:'Matematyka', room:'113', teacher:'Karolina Tomczak'}],
      5: [{subject:'wf', group:'boys', info:'WF', room:'sala gimn.', teacher:'Marek Szczepanowski'}, {subject:'wf', group:'girls', info:'WF', room:'sala gimn.', teacher:'Piotr Leśniczak'}],
      6: [{subject:'wf', group:'boys', info:'WF', room:'sala gimn.', teacher:'Marek Szczepanowski'}, {subject:'wf', group:'girls', info:'WF', room:'sala gimn.', teacher:'Piotr Leśniczak'}],
      7: [{subject:'j. ang', group:'group1', info:'język angielski', room:'109', teacher:'Mariola Serowy-Ziółkowska'}, {subject:'j. ang', group:'group2', info:'język angielski', room:'12', teacher:'Jagoda Grobelna'}],
      8: [{subject:'fiz', group:'all', info:'Fizyka', room:'217', teacher:'Joanna Król'}],
      9: [{subject:'rel', group:'all', info:'Religia', room:'212', teacher:'Adam Piechowiak'}],
      10:[]
    },
    wt: {
      1: [{subject:'j. fran', group:'all', info:'język francuski', room:'12', teacher:'Jagoda Grobelna'},{subject:'j. ros', group:'all', info:'język rosyjski', room:'101', teacher:'Dorota Waraczewska'}],
      2: [{subject:'j. pol', group:'all', info:'Język polski', room:'121', teacher:'Agata Klinger'}],
      3: [{subject:'wf', group:'boys', info:'WF', room:'sala gimn.', teacher:'Marek Szczepanowski'}, {subject:'wf', group:'girls', info:'WF', room:'sala gimn.', teacher:'Piotr Leśniczak'}],
      4: [{subject:'chem', group:'all', info:'Chemia', room:'223', teacher:'Agnieszka Janas'}],
      5: [{subject:'his', group:'all', info:'Historia', room:'24', teacher:'Marek Jabłoński'}],
      6: [{subject:'fiz', group:'all', info:'Fizyka', room:'217', teacher:'Joanna Król'}],
      7: [{subject:'j. ang', group:'group1', info:'język angielski', room:'109', teacher:'Mariola Serowy-Ziółkowska'}, {subject:'inf', group:'group2', info:'Informatyka', room:'Mateusz Nowakowski'}],
      8: [{subject:'inf', group:'group2', info:'Informatyka', room:'206', teacher:'Mateusz Nowakowski'}],
      9: [],
      10:[]
    },
    sr: {
      1: [{subject:'j. ros', group:'all', info:'język rosyjski', room:'101', teacher:'Dorota Waraczewska'}],
      2: [{subject:'inf', group:'group2', info:'Informatyka', room:'206', teacher:'Mateusz Nowakowski'}],
      3: [{subject:'inf', group:'group2', info:'Informatyka', room:'prac. inf', teacher:'Mateusz Nowakowski'}, {subject:'j. ang', group:'group1', info:'język angielski', room:'109', teacher:'Mariola Serowy-Ziółkowska'}],
      4: [{subject:'mat', group:'all', info:'Matematyka', room:'113', teacher:'Karolina Tomczak'}],
      5: [{subject:'his', group:'all', info:'Historia', room:'24', teacher:'Marek Jabłoński'}],
      6: [{subject:'bio', group:'all', info:'Biologia', room:'211', teacher:'Maria Wiechetek'}],
      7: [{subject:'geo', group:'all', info:'Geografia', room:'205', teacher:'Elżbieta Urbańska'}],
      8: [{subject:'g. wych', group:'all', info:'Godzina wychowawcza', room:'22', teacher:'Marek Jabłoński'}],
      9: [{subject:'j. fran', group:'all', info:'język francuski', room:'12', teacher:'Jagoda Grobelna'},{subject:'j. hisz', group:'all', info:'język hiszpański', room:'10', teacher:'Joanna Karkut'},{subject:'j. niem', group:'all', info:'język niemiecki', room:'10', teacher:'Joanna Gardynik'}],
      10:[]
    },
    cz: {
      1: [{subject:'et.', group:'all', info:'Etyka', room:'22', teacher:'Marek Jabłoński'}],
      2: [{subject:'inf', group:'informatyka', info:'1. grupa', room:'206', teacher:'Mateusz Nowakowski'}],
      3: [{subject:'inf', group:'informatyka', info:'1. grupa', room:'206', teacher:'Mateusz Nowakowski'}, {subject:'j. ang', group:'group2', info:'język angielski', room:'12', teacher:'Jagoda Grobelna'}],
      4: [{subject:'mat', group:'all', info:'Matematyka', room:'113', teacher:'Karolina Tomczak'}],
      5: [{subject:'fiz', group:'all', info:'Fizyka', room:'217', teacher:'Joanna Król'}],
      6: [{subject:'j. pol', group:'all', info:'Język polski', room:'121', teacher:'Agata Klinger'}],
      7: [{subject:'j. pol', group:'all', info:'Język polski', room:'121', teacher:'Agata Klinger'}],
      8: [{subject:'EZ', group:'all', info:'Edukacja zdrowotna', room:'22', teacher:'Marek Jabłoński'}],
      9: [],
      10:[]
    },
    pt: {
      1: [{subject:'inf', group:'informatyka', info:'1. grupa', room:'206', teacher:'Mateusz Nowakowski'}],
      2: [{subject:'inf', group:'informatyka', info:'1. grupa', room:'206', teacher:'Mateusz Nowakowski'}, {subject:'j. ang', group:'group2', info:'język angielski', room:'12', teacher:'Jagoda Grobelna'}],
      3: [{subject:'fiz', group:'all', info:'Fizyka', room:'217', teacher:'Joanna Król'}],
      4: [{subject:'j. pol', group:'all', info:'Język polski', room:'121', teacher:'Agata Klinger'}],
      5: [{subject:'mat', group:'all', info:'Matematyka', room:'113', teacher:'Karolina Tomczak'}],
      6: [{subject:'mat', group:'all', info:'Matematyka', room:'113', teacher:'Karolina Tomczak'}],
      7: [{subject:'AM', group:'all', info:'Aplikacje mobilne', room:'125', teacher:'Mateusz Nowakowski'}],
      8: [],
      9: [],
      10:[]
    }
  };

  // Mapping subject -> preferred image filename in Images/
  // Added group-specific keys: 'j. ang|group1', 'j. ang|group2', 'wf|boys', 'wf|girls'
  const subjectImageMap = {
    'mat': 'MatematykaZdjecie.png',
    'j. hisz': 'JezykHiszpanskiZdjecie.png',
    'j. niem': 'JezykNiemieckiZdjecie.jpg',
    'j. ros': 'JezykRosyjskiZdjecie.png',
    'j. fran': 'JezykFrancuskiZdjecie.png',
    'j. ang': 'JezykAngielskiZdjecie.png',
    'j. ang|group1': 'JezykAngielski_Gr1.png',
    'j. ang|group2': 'JezykAngielski_Gr2.jpg',
    'wf': 'WFZdjecie.png',
    'wf|boys': 'WF_Boys.jpg',
    'wf|girls': 'WF_Girls.jpg',
    'fiz': 'FizykaZdjecie.jpg',
    'chem': 'ChemiaZdjecie.png',
    'his': 'HistoriaZdjecie.png',
    'bio': 'BiologiaZdjecie.jpg',
    'geo': 'GeografiaZdjecie.jpg',
    'rel': 'ReligiaZdjecie.jpg',
    'inf': 'InformatykaZdjecie.png',
    'j. pol': 'JPolskiZdjecie.png',
    'EZ': 'EdukacjaZdrowotnaZdjecie.png',
    'AM': 'AplikacjeMobilneZdjecie.png',
    'et.': 'EtykaZdjecie.png'
  };

  // map subjects to tag classes for styling
  function subjTag(subject){
    const s = (subject || '').toLowerCase();
    if(/mat|algebra|geometr|matem/.test(s)) return 'tag-math';
    if(/j\.\s?ang|j\.\s?hisz|j\.\s?niem|j\.\s?ros|j\.\s?fran|język|lang/.test(s)) return 'tag-lang';
    if(/wf|wych/.test(s)) return 'tag-pe';
    if(/fiz|chem|bio|geo|chemia/.test(s)) return 'tag-sci';
    return 'tag-other';
  }

  // helper: avatar fallback
  function createAvatarDataUrl(name){
    const bgColors = ['#fef3c7','#d1fae5','#fee2e2','#ede9fe','#dbeafe','#f0f9ff'];
    const fg = '#0f1724';
    const initials = (name || '').split(' ').filter(Boolean).slice(0,2).map(n=>n[0].toUpperCase()).join('') || '?';
    let sum = 0;
    for(let i=0;i<name.length;i++) sum += name.charCodeAt(i);
    const bg = bgColors[sum % bgColors.length];
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='${bg}'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='140' fill='${fg}' font-weight='700'>${initials}</text></svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  // helper: get image URL for a lesson (Images/<filename>) or null
  // now checks group-specific keys first (e.g., 'j. ang|group1', 'wf|boys')
  function getImageForLesson(lesson){
    const subjRaw = (lesson.subject || '').toLowerCase().trim();
    const groupRaw = (lesson.group || '').toLowerCase().trim();

    // 1) group-specific key: "subject|group"
    if(groupRaw){
      const groupKey = `${subjRaw}|${groupRaw}`;
      for(const k in subjectImageMap){
        if(k.toLowerCase() === groupKey) return `Images/${subjectImageMap[k]}`;
      }
    }

    // 2) exact subject key
    for(const key in subjectImageMap){
      if(key.toLowerCase() === subjRaw) {
        return `Images/${subjectImageMap[key]}`;
      }
    }

    // 3) partial matching (robust)
    for(const key in subjectImageMap){
      const k = key.toLowerCase().replace(/\./g,'').replace(/\s/g,'');
      const s = subjRaw.replace(/\./g,'').replace(/\s/g,'');
      if(s.includes(k)) {
        return `Images/${subjectImageMap[key]}`;
      }
    }

    // 4) keyword fallbacks
    if(subjRaw.includes('hisz')) return `Images/${subjectImageMap['j. hisz']}`;
    if(subjRaw.includes('niem')) return `Images/${subjectImageMap['j. niem']}`;
    if(subjRaw.includes('ros')) return `Images/${subjectImageMap['j. ros']}`;
    if(subjRaw.includes('fran')) return `Images/${subjectImageMap['j. fran']}`;
    if(subjRaw.includes('mat')) return `Images/${subjectImageMap['mat']}`;
    if(subjRaw.includes('wf')) {
      // if wf and group specified, prefer group-specific if available
      if(groupRaw && subjectImageMap[`wf|${groupRaw}`]) return `Images/${subjectImageMap[`wf|${groupRaw}`]}`;
      return `Images/${subjectImageMap['wf']}`;
    }
    if(subjRaw.includes('fiz')) return `Images/${subjectImageMap['fiz']}`;
    if(subjRaw.includes('inf')) return `Images/${subjectImageMap['inf']}`;

    return null;
  }

  // DOM refs
  const timetableEl = document.getElementById('timetable');
  const groupSelect = document.getElementById('groupSelect');
  const searchInput = document.getElementById('searchInput');
  const clockEl = document.getElementById('clock');
  const currentLessonCard = document.getElementById('currentLessonCard');

  // toggles
  const toggleHisz = document.getElementById('toggleHisz');
  const toggleRos = document.getElementById('toggleRos');
  const toggleNiem = document.getElementById('toggleNiem');
  const toggleFran = document.getElementById('toggleFran');
  const toggleRel = document.getElementById('toggleRel');
  const toggleEt = document.getElementById('toggleEt');
  const toggleEZ = document.getElementById('toggleEZ');
  const toggleAM = document.getElementById('toggleAM');

  // modal refs
  const modal = document.getElementById('lessonModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const modalRoom = document.getElementById('modalRoom');
  const modalTeacher = document.getElementById('modalTeacher');
  const modalImage = document.getElementById('modalImage');
  const modalExtra = document.getElementById('modalExtra');

  // mobile elements
  const isMobile = window.matchMedia('(max-width:980px)').matches;
  const dayView = document.getElementById('dayview');
  const mobilePeriods = document.getElementById('mobilePeriods');
  const prevDayBtn = document.getElementById('prevDay');
  const nextDayBtn = document.getElementById('nextDay');
  const currentDayName = document.getElementById('currentDayName');
  let mobileDayIndex = 0; // 0..4

  // helper parse time (HH:MM) -> Date for today
  function parseTimeToToday(t){
    const [hh,mm] = t.split(':').map(Number);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0, 0);
  }

  function getCurrentPeriod(){
    const now = new Date();
    for(const p of periods){
      const s = parseTimeToToday(p.start);
      const e = parseTimeToToday(p.end);
      if(now >= s && now <= e) return p.id;
    }
    return null;
  }

  // determine whether a lesson is allowed by toggles
  function subjectAllowedByToggles(lesson){
    const subj = (lesson.subject || '').toLowerCase();

    // WF always allowed
    if(subj.includes('wf')) return true;

    // languages
    if(subj.includes('hisz')) return toggleHisz.checked;
    if(subj.includes('ros')) return toggleRos.checked;
    if(subj.includes('niem')) return toggleNiem.checked;
    if(subj.includes('fran')) return toggleFran.checked;

    // other categories
    if(subj.includes('rel') || subj.includes('relig')) return toggleRel.checked;
    if(subj.includes('et') || subj.includes('etyk')) return toggleEt.checked;
    if(subj.includes('ez') || subj.includes('edukac')) return toggleEZ.checked;
    if(subj.includes('am') || subj.includes('aplikac')) return toggleAM.checked;

    // default: allowed
    return true;
  }

  // function that decides whether a lesson should be visible for selected filter
  // filter: 'all' | 'group1' | 'group2'
  function lessonVisibleForFilter(lesson, filter) {
    const g = lesson.group || 'all';
    const subj = (lesson.subject || '').toLowerCase();

    // respect toggles first
    if(!subjectAllowedByToggles(lesson)) return false;

    // WF ALWAYS visible regardless of group selection (still respects subjectAllowedByToggles)
    if(subj.includes('wf')) return true;

    if(filter === 'all') return true;
    if(filter === 'group1') {
      return (g === 'all' || g === 'group1');
    }
    if(filter === 'group2') {
      return (g === 'all' || g === 'group2');
    }
    return true;
  }

  // utility: attach click handler to subject element to open modal
  function attachSubjectClick(el, lesson){
    el.tabIndex = 0;
    el.setAttribute('role','button');
    el.setAttribute('aria-pressed','false');
    // click / keyboard
    el.addEventListener('click', ()=> openModal(lesson));
    el.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(lesson); }
    });
  }

  // open modal with lesson details, attempt to load image from Images/, fallback to avatar
  function openModal(lesson){
    const teacherName = lesson.teacher || '—';
    modalTitle.textContent = lesson.subject || 'Przedmiot';
    modalSub.textContent = lesson.info || '';
    modalRoom.textContent = lesson.room || '—';
    modalTeacher.textContent = teacherName;
    modalExtra.textContent = ''; // placeholder

    const imageUrl = getImageForLesson(lesson);
    if(imageUrl){
      modalImage.src = imageUrl;
      modalImage.onerror = () => { modalImage.src = createAvatarDataUrl(teacherName); };
    } else {
      modalImage.src = createAvatarDataUrl(teacherName);
    }

    modal.setAttribute('aria-hidden','false');
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  // render desktop grid
  function renderGrid(filter = 'all', searchTerm = ''){
    timetableEl.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'grid';

    // first cell top-left empty
    const corner = document.createElement('div');
    corner.className = 'head cell';
    corner.innerHTML = `<div style="font-weight:700">Dzień / Godzina</div>`;
    grid.appendChild(corner);

    // headers: periods + times
    for(const p of periods){
      const head = document.createElement('div');
      head.className = 'head cell';
      head.innerHTML = `<div><strong>${p.id}</strong></div><div style="font-size:12px;color:var(--muted)">${p.start} — ${p.end}</div>`;
      grid.appendChild(head);
    }

    // rows for days
    for(const d of days){
      // weekday cell label
      const wd = document.createElement('div');
      wd.className = 'weekday cell';
      wd.innerHTML = `<div><strong>${d.name}</strong></div>`;
      grid.appendChild(wd);

      // periods cells for this day
      for(const p of periods){
        const cell = document.createElement('div');
        cell.className = 'cell';
        const lessons = (schedule[d.code] && schedule[d.code][p.id]) ? schedule[d.code][p.id] : [];
        if(!lessons || lessons.length === 0){
          cell.innerHTML = `<div class="subject"><small style="color:var(--muted)">Brak</small></div>`;
        } else {
          // filter by search + group + toggles
          const filtered = lessons.filter(ls => {
            const subjectMatches = ls.subject.toLowerCase().includes(searchTerm.toLowerCase());
            const groupMatches = lessonVisibleForFilter(ls, filter);
            return subjectMatches && groupMatches;
          });

          if(filtered.length === 0){
            cell.innerHTML = `<div class="subject"><small style="color:var(--muted)">—</small></div>`;
          } else {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.gap = '8px';

            for(const ls of filtered){
              const subj = document.createElement('div');
              subj.className = 'subject';
              subj.innerHTML = `<h4>${ls.subject}</h4><small>${ls.info || ''} ${ls.group && ls.group!=='all'?(' • '+ls.group):''}</small>`;
              subj.classList.add(subjTag(ls.subject));
              attachSubjectClick(subj, ls);
              wrapper.appendChild(subj);
            }
            cell.appendChild(wrapper);
          }
        }
        // mark current lesson
        const currentPeriod = getCurrentPeriod();
        const todayIndex = (new Date()).getDay(); // 0 Sun, 1 Mon ...
        if(currentPeriod === p.id && ((todayIndex >=1 && todayIndex <=5) && days[todayIndex-1].code === d.code)){
          cell.classList.add('current');
          const badge = document.createElement('div');
          badge.className = 'badge';
          badge.textContent = 'NA BIEŻĄCO';
          cell.appendChild(badge);
        }

        grid.appendChild(cell);
      }
    }

    timetableEl.appendChild(grid);
  }

  // mobile day rendering
  function renderMobileDay(idx, filter='all', searchTerm = ''){
    mobilePeriods.innerHTML = '';
    const d = days[idx];
    currentDayName.textContent = d.name;
    for(const p of periods){
      const card = document.createElement('div');
      card.className = 'mobile-period';
      const header = document.createElement('div');
      header.className = 'time';
      header.textContent = `Lekcja ${p.id} — ${p.start} — ${p.end}`;
      card.appendChild(header);

      const lessons = (schedule[d.code] && schedule[d.code][p.id]) ? schedule[d.code][p.id] : [];
      const filtered = lessons.filter(ls => {
        const subjectMatches = ls.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const groupMatches = lessonVisibleForFilter(ls, filter);
        return subjectMatches && groupMatches;
      });

      if(filtered.length === 0){
        const empty = document.createElement('div');
        empty.style.color = 'var(--muted)';
        empty.textContent = 'Brak zajęć';
        card.appendChild(empty);
      } else {
        for(const ls of filtered){
          const subj = document.createElement('div');
          subj.style.marginTop = '6px';
          subj.innerHTML = `<strong>${ls.subject}</strong><div style="color:var(--muted);font-size:13px">${ls.info || ''} ${ls.group && ls.group!=='all'?(' • '+ls.group):''}</div>`;
          subj.classList.add('mobile-subject');
          attachSubjectClick(subj, ls);
          card.appendChild(subj);
        }
      }

      // current highlight
      const currentPeriod = getCurrentPeriod();
      const todayIndex = (new Date()).getDay();
      if(currentPeriod === p.id && ((todayIndex >=1 && todayIndex <=5) && days[todayIndex-1].code === d.code)){
        card.classList.add('current');
        const live = document.createElement('div');
        live.style.marginTop='8px';
        live.innerHTML = `<span style="font-weight:600;color:var(--accent)">Aktualna lekcja</span>`;
        card.appendChild(live);
      }

      mobilePeriods.appendChild(card);
    }
  }

  // update current lesson side panel and clock
  function updateClockAndCurrent(){
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString();
    // find current lesson for today
    const todayIndex = now.getDay(); // 1..5 -> Mon-Fri
    if(todayIndex < 1 || todayIndex > 5){
      currentLessonCard.innerHTML = `<div class="card muted">Dziś nie ma lekcji (weekend).</div>`;
      return;
    }
    const dayCode = days[todayIndex-1].code;
    const curP = getCurrentPeriod();
    if(!curP){
      currentLessonCard.innerHTML = `<div class="card muted">Brak aktywnej lekcji teraz.</div>`;
      return;
    }
    const lessons = schedule[dayCode][curP] || [];
    let content = `<div style="font-weight:700">Lekcja ${curP} — ${periods.find(p=>p.id===curP).start}–${periods.find(p=>p.id===curP).end}</div>`;
    for(const l of lessons){
      content += `<div style="margin-top:8px"><strong>${l.subject}</strong><div style="color:var(--muted)">${l.info || ''} ${l.group && l.group!=='all' ?(' • '+l.group):''}</div><div style="color:var(--muted);margin-top:4px">Sala: ${l.room || '—'} • Nauczyciel: ${l.teacher || '—'}</div></div>`;
    }

    // countdown to end of period
    const end = parseTimeToToday(periods.find(p=>p.id===curP).end);
    const diff = Math.max(0, Math.floor((end - now)/1000));
    const mm = Math.floor(diff/60);
    const ss = diff%60;
    content += `<div style="margin-top:10px;color:var(--accent)">Do końca: ${mm} min ${ss} s</div>`;
    currentLessonCard.innerHTML = content;
  }

  // initialization and events
  function init(){
    const filter = groupSelect.value;
    const searchTerm = searchInput.value.trim();

    if(isMobile){
      dayView.style.display='block';
      dayView.setAttribute('aria-hidden','false');
      renderMobileDay(mobileDayIndex, filter, searchTerm);
    } else {
      renderGrid(filter, searchTerm);
    }
    updateClockAndCurrent();
  }

  // event listeners
  groupSelect.addEventListener('change', () => {
    const f = groupSelect.value;
    if(isMobile) renderMobileDay(mobileDayIndex, f, searchInput.value.trim());
    else renderGrid(f, searchInput.value.trim());
  });

  searchInput.addEventListener('input', () => {
    const f = groupSelect.value;
    const s = searchInput.value.trim();
    if(isMobile) renderMobileDay(mobileDayIndex, f, s);
    else renderGrid(f, s);
  });

  // toggles -> re-render when changed
  [toggleHisz, toggleRos, toggleNiem, toggleFran, toggleRel, toggleEt, toggleEZ, toggleAM].forEach(inp => {
    inp.addEventListener('change', () => {
      const f = groupSelect.value;
      const s = searchInput.value.trim();
      if(isMobile) renderMobileDay(mobileDayIndex, f, s);
      else renderGrid(f, s);
    });
  });

  // mobile nav
  if(prevDayBtn && nextDayBtn){
    prevDayBtn.addEventListener('click', ()=> {
      mobileDayIndex = (mobileDayIndex + 4) % 5;
      renderMobileDay(mobileDayIndex, groupSelect.value, searchInput.value.trim());
    });
    nextDayBtn.addEventListener('click', ()=> {
      mobileDayIndex = (mobileDayIndex + 1) % 5;
      renderMobileDay(mobileDayIndex, groupSelect.value, searchInput.value.trim());
    });
  }

  // modal events
  modalBackdrop.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // re-render every second for live countdown and highlight
  init();
  setInterval(() => {
    if(isMobile) renderMobileDay(mobileDayIndex, groupSelect.value, searchInput.value.trim());
    else renderGrid(groupSelect.value, searchInput.value.trim());
    updateClockAndCurrent();
  }, 1000);

  // small animation on load
  document.addEventListener('DOMContentLoaded', ()=> {
    document.body.style.opacity = 0;
    setTimeout(()=> document.body.style.transition = 'opacity .4s ease', 10);
    setTimeout(()=> document.body.style.opacity = 1, 20);
  });

})();
