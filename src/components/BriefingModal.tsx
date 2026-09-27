import { useState, FormEvent } from 'react';
import { X, Send, CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { cinemaAudio } from '../utils/audioSynth';

interface BriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BriefingModal({ isOpen, onClose }: BriefingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [protocolCode, setProtocolCode] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'podcast_vodcast',
    location: 'luanda',
    budget: 'kz_medio',
    timeline: '1-2_meses',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    cinemaAudio.playShutterClick();
    const code = `EFB-AO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setProtocolCode(code);
    setSubmitted(true);
  };

  const handleReset = () => {
    cinemaAudio.playApertureClick();
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-3xl bg-[#111114] border border-[#D4AF37]/30 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#111114] border-b border-white/10">
          <div>
            <span className="font-mono-tech text-[10px] text-[#D4AF37] uppercase tracking-widest block">
              EFB MÍDIA • LUANDA &amp; LISBOA
            </span>
            <h3 className="font-cinematic text-2xl text-white font-normal">
              Formulário de Briefing de Projecto
            </h3>
          </div>

          <button
            onClick={() => {
              cinemaAudio.playApertureClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <span className="font-mono-tech text-xs text-[#D4AF37] uppercase tracking-widest mb-1">
                BRIEFING REGISTADO COM SUCESSO
              </span>

              <h4 className="font-cinematic text-3xl text-white font-normal mb-2">
                O seu projecto entrou na nossa mira técnica.
              </h4>

              <div className="my-6 p-4 rounded-lg bg-black border border-[#D4AF37]/30 font-mono-tech text-xs text-zinc-300 w-full">
                <div className="text-zinc-500 uppercase text-[10px] mb-1">Código de Protocolo (Angola)</div>
                <div className="text-lg text-[#D4AF37] font-bold">{protocolCode}</div>
              </div>

              <p className="text-xs text-zinc-400 font-light leading-relaxed mb-8">
                A nossa direcção criativa em Luanda analisará os requisitos técnicos da sua produção e entrará em contacto num prazo de até 24 horas úteis.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <a
                  href={`https://wa.me/244923060501?text=Ol%C3%A1%20EFB%20M%C3%ADdia%20Luanda,%20submeti%20o%20briefing%20${protocolCode}%20e%20gostaria%20de%20conversar.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold font-mono-tech text-xs uppercase tracking-wider rounded transition-colors shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Luanda (+244)</span>
                </a>

                <button
                  onClick={handleReset}
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-mono-tech text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-xs text-zinc-400 font-light">
                Preencha os parâmetros fundamentais para que a nossa equipa possa calibrar o enquadramento orçamental em Kwanzas (AOA) ou Moeda Estrangeira e a afectação de câmaras e estúdios.
              </p>

              {/* Grid 1: Name, Company, Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João Baptista Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/10 text-white text-xs font-mono-tech focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider mb-1.5">
                    Empresa / Instituição
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Banco / Empresa / Ministério / Marca"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/10 text-white text-xs font-mono-tech focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider mb-1.5">
                    Correio Electrónico Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contacto@empresa.co.ao"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/10 text-white text-xs font-mono-tech focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider mb-1.5">
                    Telemóvel / WhatsApp (Angola ou Exterior) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+244 923 060 501"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/10 text-white text-xs font-mono-tech focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Grid 2: Type, Location, Budget, Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider mb-1.5">
                    Vertical do Projecto
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/10 text-white text-xs font-mono-tech focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <option value="podcast_vodcast">Serviços &amp; Desenvolvimento de Podcast / Vodcast</option>
                    <option value="spot_tv">Spot Publicitário para Televisão &amp; Digital</option>
                    <option value="spot_radio">Spot Radiofónico &amp; Sound Branding (RNA, LAC)</option>
                    <option value="cinema_ficcao">Cinema Autoral &amp; Ficção de Longo Fôlego</option>
                    <option value="documentario">Documentário &amp; Séries de Memória</option>
                    <option value="motion_design">Motion Design 3D &amp; Efeitos Visuais</option>
                    <option value="marketing_digital">Marketing Digital &amp; Gestão de Campanhas</option>
                    <option value="websites">Websites &amp; Plataformas Digitais de Alto Nível</option>
                    <option value="comunicacao">Comunicação Estratégica &amp; Relações Públicas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider mb-1.5">
                    Pólo Operacional de Rodagem
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/10 text-white text-xs font-mono-tech focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <option value="luanda">Luanda (Talatona, Ilha, Kilamba, Baía)</option>
                    <option value="provincias">Províncias de Angola (Benguela, Huíla, Namibe, etc.)</option>
                    <option value="lisboa">Lisboa &amp; Hub Europeu</option>
                    <option value="coproducao">Co-produção Angola - Europa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider mb-1.5">
                    Enquadramento de Investimento Estimado
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/10 text-white text-xs font-mono-tech focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <option value="kz_compacto">10.000.000 Kz – 25.000.000 Kz (Podcasts, Spots Rádio)</option>
                    <option value="kz_medio">25.000.000 Kz – 60.000.000 Kz (Spots TV &amp; Campanhas)</option>
                    <option value="kz_grande">60.000.000 Kz – 150.000.000 Kz (Campanhas 360° &amp; Docs)</option>
                    <option value="kz_cinema">150.000.000+ Kz / Orçamento Internacional de Cinema</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider mb-1.5">
                    Prazo Pretendido para Entrega
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/10 text-white text-xs font-mono-tech focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <option value="urgente">Urgente (até 3 semanas)</option>
                    <option value="1-2_meses">Padrão (1 a 2 meses)</option>
                    <option value="3-4_meses">Médio Prazo (3 a 4 meses)</option>
                    <option value="temporada">Temporada Contínua / Contrato Anual</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider mb-1.5">
                  Objectivos e Descrição Resumida da Produção
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Partilhe os objectivos da sua marca, mensagens-chave, tom cinematográfico pretendido e referências que admire..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/10 text-white text-xs font-mono-tech focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono-tech text-zinc-500">
                  * Campos de preenchimento obrigatório.
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-white text-black font-semibold font-mono-tech text-xs uppercase tracking-[0.2em] rounded-[2px] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                >
                  <span>Submeter Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
