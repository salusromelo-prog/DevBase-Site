'use client'
import { useState } from 'react'

function mask(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0,3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`
  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9,11)}`
}

function validate(v: string) {
  const d = v.replace(/\D/g, '')
  if (d.length !== 11 || /^(.)\1+$/.test(d)) return false
  let s = 0
  for (let i = 0; i < 9; i++) s += +d[i] * (10 - i)
  let r = (s * 10) % 11; if (r >= 10) r = 0
  if (r !== +d[9]) return false
  s = 0
  for (let i = 0; i < 10; i++) s += +d[i] * (11 - i)
  r = (s * 10) % 11; if (r >= 10) r = 0
  return r === +d[10]
}

export default function CpfDemo() {
  const [cpf, setCpf] = useState('')
  const digits = cpf.replace(/\D/g, '').length
  const ok  = digits === 11 && validate(cpf)
  const err = digits === 11 && !validate(cpf)

  return (
    <div className="cpf-demo">
      <p className="cpf-demo__lead">// componente real — valida o dígito verificador</p>
      <label className="cpf-demo__label">CPF</label>
      <div className={`cpf-demo__field${ok ? ' ok' : err ? ' err' : ''}`}>
        <input
          type="text"
          value={cpf}
          onChange={e => setCpf(mask(e.target.value))}
          placeholder="000.000.000-00"
          maxLength={14}
        />
        {ok  && <span className="cpf-demo__status">✓ válido</span>}
        {err && <span className="cpf-demo__status">✗ inválido</span>}
      </div>
      <p className="cpf-demo__hint">tente: <code>111.111.111-11</code> (aceito pela maioria das libs) vs <code>529.982.247-25</code></p>
    </div>
  )
}
