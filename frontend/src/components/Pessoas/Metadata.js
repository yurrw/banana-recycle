import React, { PropTypes } from 'react';
import Select, { Creatable } from 'react-select';
// import DatePicker from "./react-datepicker";
// import moment from './moment';

export default class Metadata extends React.Component {	
	render () {		
		const { actions, pessoa } = this.props;
		return (			
			<form>
				<div className="row" style={{paddingTop: "15px"}}>
					<div className="col-md-6">
						<div className="form-group">
							<label>Título</label>
							<input 
								type="text" 
								className="form-control"
								value={pessoa.title}
								onChange={(e) => actions.setTitle(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Autores</label>
							<Creatable
								name="authors-select"
								multi
								value={pessoa.authors}												
								noResultsText="Nenhum resultado encontrado"
								placeholder="Selecione..."								
								clearable={false}
								onChange={(value) => actions.setAuthors(value)}
							/>							
						</div>
						<div className="form-group">
							<label>Instituições</label>
							<Creatable
								name="institutions-select"					
								value={pessoa.institutions}													
								placeholder="Selecione..."
								multi								
								clearable={false}
								onChange={(value) => actions.setInstitutions(value)}
							/>							
						</div>
						<div className="form-group">
							<label>Link para o pessoao</label>
							<input 
								type="text" 
								className="form-control"
								value={pessoa.url === null ? "" : pessoa.url}								
								onChange={(e) => actions.setUrl(e.target.value)}
							/>
						</div>								
						<div className="form-group">
							<label>Data da Última Modificação</label>
							<br />
							{/* <DatePicker
								onChange={(option) => actions.setDatetime(option ? moment(option).format("YYYY-MM-DD") : null)}
								selected={pessoa.datetime ? moment(pessoa.datetime) : null}						
								locale="pt-BR"
								todayButton={"Hoje"}
								dateFormat="DD/MM/YYYY"		
								className="neocafe-datepicker"					
								placeholderText="DD/MM/YYYY" /> */}
						</div>
						<div className="form-group">
							<label>Cobertura Temporal</label>
							<br />
							De &nbsp;
							{/* <DatePicker
								onChange={(option) => actions.setStartCoverageDate(option ? moment(option).format("YYYY-MM-DD") : null)}
								selected={pessoa.startCoverageDate ? moment(pessoa.startCoverageDate) : null}						
								locale="pt-BR"
								todayButton={"Hoje"}
								dateFormat="DD/MM/YYYY"	
								className="neocafe-datepicker"
								placeholderText="DD/MM/YYYY" /> */}
							&nbsp; Até &nbsp;					
							{/* <DatePicker
								onChange={(option) => actions.setEndCoverageDate(option ? moment(option).format("YYYY-MM-DD") : null)}
								selected={pessoa.endCoverageDate ? moment(pessoa.endCoverageDate) : null}						
								locale="pt-BR"
								todayButton={"Hoje"}
								dateFormat="DD/MM/YYYY"		
								className="neocafe-datepicker"					
								placeholderText="DD/MM/YYYY" /> */}
						</div>						
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>Pasta</label>
							<Creatable
								name="folders-select"					
								value={pessoa.folder}													
								placeholder="Selecione..."								
								onChange={(value) => actions.setFolder(value)}
							/>							
						</div>					
						<div className="form-group">
							<label>Temas</label>
							<Select
								name="themes-select"					
								value={pessoa.themes}													
								placeholder="Selecione..."
								multi								
								clearable={false}
								onChange={(value) => actions.setThemes(value)}
							/>							
						</div>
						<div className="form-group">
							<label>Palavras-Chave</label>
							<Creatable
								name="keywords-select"					
								value={pessoa.keywords}													
								placeholder="Selecione..."
								multi								
								clearable={false}
								onChange={(value) => actions.setKeywords(value)}
							/>							
						</div>
						<div className="form-group">
							<label>Descrição</label>
							<textarea 
								rows={9}						
								style={{width: "100%", resize: "none"}}
								value={pessoa.description} 
								onChange={(e) => actions.setDescription(e.target.value)} />
						</div>						
					</div>													
				</div>
			</form>
		);
	}
}

Metadata.propTypes = {
	actions: PropTypes.object.isRequired,
	pessoa: PropTypes.object.isRequired
};