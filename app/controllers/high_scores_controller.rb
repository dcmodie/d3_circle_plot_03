class HighScoresController < ApplicationController
  # GET /high_scores
  # GET /high_scores.json

  def index
    @high_scores = HighScore.all



    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @high_scores }
    end
  end

  # GET /high_scores/1
  # GET /high_scores/1.json
  @@glob=0
  def show
    # get this from web service
    @@glob += 1

    @data_cont =         [
        [500, 2], [108, 900], [25, 500], [10, 33], [330, 95],
        [410, 12], [47, 44], [250, 670], [85, 210], [220, 88], [60,1500]
    ].to_json


    @data_cont_1 =         [
        [500, 200], [108, 900], [25, 500], [10, 33], [330, 95],
        [410, 12], [47, 44], [250, 670], [85, 210], [220, 88], [60,1500]
    ].to_json


    @high_score = HighScore.find(params[:id])
    @high_score.score += 1


    @high_score.save()
    respond_to do |format|
      format.html # show.html.erb
                  #  format.json { render json: {"key"=>"value"} }
    end
  end

  # GET /high_scores/new
  # GET /high_scores/new.json
  def new
    @high_score = HighScore.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @high_score }
    end
  end

  # GET /high_scores/1/edit
  def edit
    @high_score = HighScore.find(params[:id])
  end

  # POST /high_scores
  # POST /high_scores.json
  def create
    @high_score = HighScore.new(params[:high_score])

    respond_to do |format|
      if @high_score.save
        format.html { redirect_to @high_score, notice: 'High score was successfully created.' }
        format.json { render json: @high_score, status: :created, location: @high_score }
      else
        format.html { render action: "new" }
        format.json { render json: @high_score.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /high_scores/1
  # PUT /high_scores/1.json
  def update
    @high_score = HighScore.find(params[:id])

    respond_to do |format|
      if @high_score.update_attributes(params[:high_score])
        format.html { redirect_to @high_score, notice: 'High score was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @high_score.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /high_scores/1
  # DELETE /high_scores/1.json
  def destroy
    @high_score = HighScore.find(params[:id])
    @high_score.destroy

    respond_to do |format|
      format.html { redirect_to high_scores_url }
      format.json { head :no_content }
    end
  end
end
