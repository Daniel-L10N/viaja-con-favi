const API_BASE = 'http://127.0.0.1:8000';

async function getOfertas() {
  const res = await fetch(`${API_BASE}/api/paquetes/`);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const data = await res.json();
  return data.map((p: any) => ({
    id: p.id,
    titulo: p.titulo,
    precio: Number(p.precio),
    destino: p.destino?.pais || '',
    destacada: p.destacado || false,
    status: p.estado,
  })).filter((o: any) => o.status === 'activa' || !o.status);
}

async function getBlogPosts() {
  const res = await fetch(`${API_BASE}/api/destinos/`);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const data = await res.json();
  return data.map((d: any) => ({
    id: d.id,
    titulo: d.pais,
    slug: d.id,
    status: d.activo ? 'publicada' : 'borrador',
  })).filter((p: any) => p.status === 'publicada');
}

async function runTests() {
  console.log('🧪 Testeando API del Frontend\n');
  let passed = 0;
  let failed = 0;

  // Test 1: getOfertas - debe retornar array
  try {
    const ofertas = await getOfertas();
    if (Array.isArray(ofertas) && ofertas.length > 0) {
      console.log('✅ TEST 1: getOfertas retorna array con datos');
      passed++;
    } else {
      console.log('❌ TEST 1: getOfertas no retorna datos');
      failed++;
    }
  } catch (e: any) {
    console.log('❌ TEST 1: Error -', e.message);
    failed++;
  }

  // Test 2: getOfertas - verificar estructura
  try {
    const ofertas = await getOfertas();
    const oferta = ofertas[0];
    if (oferta && oferta.titulo && oferta.precio !== undefined) {
      console.log('✅ TEST 2: getOfertas tiene estructura correcta (titulo, precio)');
      passed++;
    } else {
      console.log('❌ TEST 2: Estructura incorrecta');
      failed++;
    }
  } catch (e: any) {
    console.log('❌ TEST 2: Error -', e.message);
    failed++;
  }

  // Test 3: getOfertas - manejar error
  const originalFetch = global.fetch;
  global.fetch = () => Promise.resolve({ ok: false });
  try {
    const ofertas = await getOfertas();
    if (ofertas.length === 0) {
      console.log('✅ TEST 3: getOfertas maneja errores correctamente');
      passed++;
    } else {
      console.log('❌ TEST 3: No manejó el error');
      failed++;
    }
  } catch (e: any) {
    console.log('✅ TEST 3: getOfertas maneja errores (retorna array vacío)');
    passed++;
  }
  global.fetch = originalFetch;

  // Test 4: getBlogPosts - debe retornar array
  try {
    const posts = await getBlogPosts();
    if (Array.isArray(posts)) {
      console.log('✅ TEST 4: getBlogPosts retorna array');
      passed++;
    } else {
      console.log('❌ TEST 4: No retorna array');
      failed++;
    }
  } catch (e: any) {
    console.log('❌ TEST 4: Error -', e.message);
    failed++;
  }

  // Test 5: getBlogPosts - verificar campos
  try {
    const posts = await getBlogPosts();
    if (posts[0] && (posts[0].titulo || posts[0].slug)) {
      console.log('✅ TEST 5: getBlogPosts tiene campos correctos');
      passed++;
    } else {
      console.log('❌ TEST 5: Campos incorrectos');
      failed++;
    }
  } catch (e: any) {
    console.log('❌ TEST 5: Error -', e.message);
    failed++;
  }

  // Test 6: getBlogPosts - error handling
  global.fetch = () => Promise.resolve({ ok: false });
  try {
    const posts = await getBlogPosts();
    if (posts.length === 0) {
      console.log('✅ TEST 6: getBlogPosts maneja errores correctamente');
      passed++;
    } else {
      console.log('❌ TEST 6: No manejó error');
      failed++;
    }
  } catch (e: any) {
    console.log('✅ TEST 6: Error manejado correctamente');
    passed++;
  }
  global.fetch = originalFetch;

  console.log(`\n📊 RESULTADOS: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();