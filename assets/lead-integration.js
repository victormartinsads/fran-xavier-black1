async function saveCampaignLead(page, name, email, phone) {
  const response = await fetch('/api/leads', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, name, email, phone }),
    signal: AbortSignal.timeout(15000)
  });
  if (!response.ok || !(await response.json()).ok) throw new Error('Falha ao salvar');
}

if (document.documentElement.dataset.campaign === 'imperio') {
  const dialog = document.createElement('dialog');
  dialog.className = 'campaign-dialog';
  dialog.setAttribute('aria-labelledby', 'campaign-dialog-title');
  dialog.innerHTML = `<div class="campaign-dialog-inner"><div class="campaign-dialog-header"><div><p class="campaign-kicker">IMPÉRIO DE ÁGUIAS</p><h2 id="campaign-dialog-title">Vamos conversar sobre sua jornada?</h2></div><button type="button" class="campaign-close" aria-label="Fechar formulário">×</button></div><form class="campaign-form"><label>Seu nome<input name="name" autocomplete="name" minlength="2" maxlength="120" required></label><label>Seu e-mail<input name="email" type="email" autocomplete="email" maxlength="254" required></label><label>Seu WhatsApp<input name="phone" type="tel" autocomplete="tel" inputmode="tel" pattern="[0-9()+.\\s-]{10,20}" required></label><p>Seus dados serão enviados à equipe Fran Xavier para contato sobre o Império de Águias. Em seguida, você poderá enviar sua mensagem pelo WhatsApp.</p><p class="campaign-error" role="alert" hidden></p><button class="button" type="submit">Continuar para o WhatsApp</button></form></div>`;
  document.body.append(dialog);
  const form = dialog.querySelector('form'), submit = form.querySelector('[type=submit]'), error = form.querySelector('.campaign-error');
  document.addEventListener('click', e => {
    const button = e.target.closest('a.button');
    if (!button || new URLSearchParams(location.search).has('editar')) return;
    e.preventDefault(); dialog.showModal(); form.elements.name.focus();
  });
  dialog.querySelector('.campaign-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  form.addEventListener('submit', async e => {
    e.preventDefault(); if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim(), email = form.elements.email.value.trim(), phone = form.elements.phone.value.trim();
    submit.disabled = true; error.hidden = true; submit.textContent = 'Salvando...';
    try {
      await saveCampaignLead('imperio', name, email, phone);
      const message = `Olá, Fran! Vim pela página do Império de Águias 2027.\n\nNome: ${name}\nE-mail: ${email}\nWhatsApp: ${phone}\n\nQuero saber mais sobre a jornada.`;
      location.href = 'https://wa.me/5554991471234?text=' + encodeURIComponent(message);
    } catch (_) { error.textContent = 'Não foi possível salvar seus dados. Verifique sua conexão e tente novamente.'; error.hidden = false; }
    finally { submit.disabled = false; submit.textContent = 'Continuar para o WhatsApp'; }
  });
}
