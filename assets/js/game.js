(function(){
  const grid=document.getElementById('idea-grid');
  if(!grid)return;

  const STORE='dc_build_list';

  const PROJECTS=[
    {id:'p1',name:'Cutting Board',cat:'Woodworking',time:'under-2h',level:'beginner',tools:'hand-tools',cost:'$',timeText:'1–2 hours',needs:['One hardwood board, 400×200×20mm','Sandpaper 120–220 grit','Food-safe oil or wax'],steps:['Rip the board to width with a hand saw, cutting on the waste side.','Sand through 120, 180, and 220 grit, breaking the edges.','Apply a thin coat of oil, wait 20 minutes, wipe off the excess.']},
    {id:'p2',name:'Simple Storage Box',cat:'Woodworking',time:'weekend',level:'beginner',tools:'hand-tools',cost:'$$',timeText:'One weekend',needs:['Plywood, 12mm, about 1 sheet','Wood glue','Clamps, 4 or more'],steps:['Cut all six panels to size, checking squareness before assembly.','Dry fit, then glue and clamp the four sides and the base.','Sand the seams flush once the glue has cured.']},
    {id:'p3',name:'Wall Shelf With Brackets',cat:'Woodworking',time:'under-2h',level:'beginner',tools:'hand-tools',cost:'$$',timeText:'2–3 hours',needs:['Shelf board, 900mm long','Two metal brackets','Wall fixings rated for the load'],steps:['Mark bracket positions level with a straightedge.','Sand the board and apply a finish.','Fix brackets into studs or suitable fixings, then set the board.']},
    {id:'p4',name:'Picture Frame From Offcuts',cat:'Woodworking',time:'weekend',level:'intermediate',tools:'hand-tools',cost:'$',timeText:'Half a day',needs:['Four strips of timber, equal width','Corner blocks or a mitre saw','Glass and backing board'],steps:['Cut the mitres on offcut timber first as practice.','Dry fit the frame and check diagonals match.','Glue corners, nail or screw the backing, and fit the glass.']},
    {id:'p5',name:'Darning a Wool Sweater',cat:'Textiles',time:'under-2h',level:'beginner',tools:'hand-tools',cost:'$',timeText:'1 hour per hole',needs:['Matching yarn','Darning needle','A light blocking mat'],steps:['Work a loose grid of stitches across the hole to anchor it.','Fill the gap closely, following the knit direction.','Steam gently and lay flat to even out the repair.']},
    {id:'p6',name:'Hem a Shirt Without a Machine',cat:'Textiles',time:'under-2h',level:'beginner',tools:'hand-tools',cost:'$',timeText:'1–2 hours',needs:['Sewing needle and thread','Measuring tape','Iron'],steps:['Press a crease where the hem should sit, then measure twice the allowance.','Fold and pin the hem at a consistent width all the way round.','Use a running stitch, press as you go, and keep the fold even.']},
    {id:'p7',name:'Repair a Loose Chair Leg',cat:'Repairs',time:'under-2h',level:'beginner',tools:'hand-tools',cost:'$',timeText:'45 minutes',needs:['Wood glue','Clamps','Sanding block'],steps:['Take the joint apart and scrape all old glue from both surfaces.','Re-glue, clamp square, and leave overnight.','Wipe the squeeze-out before it cures.']},
    {id:'p8',name:'Fix a Stripped Screw Hole',cat:'Repairs',time:'under-2h',level:'beginner',tools:'hand-tools',cost:'$',timeText:'30 minutes',needs:['Hardwood dowel','Drill and bit','Slightly longer screw'],steps:['Glue a dowel into the stripped hole and let it set.','Re-drill a pilot hole through the dowel.','Fit the longer screw and test the joint.']},
    {id:'p9',name:'Clean and Service a Small Appliance',cat:'Repairs',time:'weekend',level:'advanced',tools:'powered',cost:'$',timeText:'2–3 hours',needs:['Screwdriver set','Contact cleaner','A soft brush'],steps:['Unplug the appliance and never work on it while connected.','Remove lint build-up from vents and filters.','Clean the contacts lightly and reassemble before testing.']},
    {id:'p10',name:'Pallet Project Board',cat:'Upcycling',time:'under-2h',level:'beginner',tools:'hand-tools',cost:'$',timeText:'1–2 hours',needs:['One clean pallet','Sandpaper','Stain or paint'],steps:['Pull nails with the grain to avoid splitting the boards.','Sand the face flat and knock back every edge.','Apply a thin stain coat, let it dry, then seal.']},
    {id:'p11',name:'Jar Planter With Drainage',cat:'Upcycling',time:'under-2h',level:'beginner',tools:'hand-tools',cost:'$',timeText:'1 hour',needs:['Wide-mouth glass jar','Aquarium gravel','Potting mix and a plant'],steps:['Check the rim for chips and clean off any label residue.','Poke drainage holes in the base and cover them with gravel.','Add soil, plant, and a top layer of gravel to hold it in.']},
    {id:'p12',name:'Simple Stool',cat:'Woodworking',time:'weekend',level:'intermediate',tools:'hand-tools',cost:'$$$',timeText:'Two weekends',needs:['Hardwood stock','Four dowels or tenons','Wood glue and clamps'],steps:['Cut legs, seat, and rails to the tested dimensions — do not improvise on a load-bearing part.','Dry fit every joint and mark it before gluing.','Assemble, clamp square, and let it cure fully before sanding and finishing.']}
  ];

  const read=()=>{
    try{const raw=JSON.parse(localStorage.getItem(STORE)||'[]');return Array.isArray(raw)?raw:[];}catch(e){return [];}
  };
  const write=list=>{try{localStorage.setItem(STORE,JSON.stringify(list));}catch(e){}};

  let filter='all';
  let cat='';
  let saved=read();

  const params=new URLSearchParams(window.location.search);
  const wanted=(params.get('cat')||'').trim();
  if(wanted&&PROJECTS.some(p=>p.cat.toLowerCase()===wanted.toLowerCase()))cat=wanted;

  const card=()=>{
    const box=document.createElement('div');
    box.className='card';
    box.style.display='flex';
    box.style.flexDirection='column';
    box.style.gap='8px';
    return box;
  };

  const render=()=>{
    grid.innerHTML='';
    const list=PROJECTS.filter(p=>(!cat||p.cat===cat)&&(filter==='all'||p.time===filter||(filter==='beginner'&&p.level==='beginner')||(filter==='hand-tools'&&p.tools==='hand-tools')));
    if(!list.length){
      const empty=card();
      empty.innerHTML='<h3>No projects match that filter</h3><p>Try another filter to see more project ideas.</p>';
      grid.appendChild(empty);
      return;
    }
    list.forEach(p=>{
      const isSaved=saved.some(s=>s.id===p.id);
      const el=card();
      const head=document.createElement('div');
      head.innerHTML='<div class="meta">'+p.cat+' &bull; '+p.timeText+' &bull; '+p.cost+'</div>';
      const title=document.createElement('h3');
      title.textContent=p.name;
      const body=document.createElement('p');
      body.style.margin='0';
      body.textContent='Level: '+p.level+' • Tools: '+(p.tools==='hand-tools'?'hand tools':'hand and powered tools');

      const details=document.createElement('div');
      details.style.display='none';
      const needs=document.createElement('p');
      needs.innerHTML='<b>You need:</b><br>'+p.needs.map(n=>'&bull; '+n).join('<br>');
      const steps=document.createElement('p');
      steps.innerHTML='<b>Steps:</b><br>'+p.steps.map((s,i)=>(i+1)+'. '+s).join('<br>');
      details.appendChild(needs);
      details.appendChild(steps);

      const view=document.createElement('button');
      view.className='btn ghost';
      view.style.alignSelf='flex-start';
      view.textContent='What you need';
      view.addEventListener('click',()=>{
        const open=details.style.display!=='none';
        details.style.display=open?'none':'block';
        view.textContent=open?'What you need':'Hide details';
      });

      const btn=document.createElement('button');
      btn.className=isSaved?'btn ghost':'btn';
      btn.style.alignSelf='flex-start';
      btn.textContent=isSaved?'Saved ✓':'Save to build list';
      btn.addEventListener('click',()=>{
        if(saved.some(s=>s.id===p.id)){saved=saved.filter(s=>s.id!==p.id);}else{saved=saved.concat([{id:p.id,name:p.name,cat:p.cat,time:p.timeText,at:Date.now()}]);}
        write(saved);
        render();
      });
      el.appendChild(head);
      el.appendChild(title);
      el.appendChild(body);
      el.appendChild(details);
      const row=document.createElement('div');
      row.style.display='flex';
      row.style.gap='10px';
      row.style.flexWrap='wrap';
      row.appendChild(view);
      row.appendChild(btn);
      el.appendChild(row);
      grid.appendChild(el);
    });
  };

  document.querySelectorAll('[data-filter]').forEach(b=>{
    b.addEventListener('click',()=>{
      filter=b.getAttribute('data-filter');
      document.querySelectorAll('[data-filter]').forEach(x=>{x.style.opacity='';x.style.fontWeight='';});
      b.style.opacity='1';
      b.style.fontWeight='800';
      render();
    });
  });

  const clear=document.getElementById('btn-clear');
  if(clear){
    clear.addEventListener('click',()=>{
      saved=[];
      write(saved);
      render();
    });
  }

  const catNote=document.getElementById('cat-note');
  if(catNote){
    if(cat){
      catNote.style.display='block';
      catNote.innerHTML='<b>Showing '+cat+'.</b> <a href="game.html" style="color:var(--a)">Show all categories</a>';
    }else{
      catNote.style.display='none';
    }
  }

  render();
})();
